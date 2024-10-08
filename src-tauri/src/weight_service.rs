use core::str;
use std::{
    io::ErrorKind,
    ops::Deref,
    sync::{Arc, Mutex},
    thread,
    time::Duration,
};
use tauri::{Manager, Window};

#[tauri::command]
pub fn get_ports() -> Result<Vec<String>, String> {
    let ports = serialport::available_ports();
    match ports {
        Ok(ports) => {
            let p_names: Vec<String> = ports.iter().map(|p| p.port_name.to_owned()).collect();
            return Ok(p_names);
        }
        Err(e) => return Err(e.description),
    };
}

#[tauri::command]
pub fn emit_weight_on_port(window: Window, port: &str, baud_rate: u32) -> Result<(), String> {
    let mut con = match serialport::new(port, baud_rate)
        .timeout(Duration::from_millis(10))
        .open()
    {
        Ok(c) => c,
        Err(e) => return Err(e.description),
    };

    let run = Arc::new(Mutex::new(true));
    let run_clone = Arc::clone(&run);
    window.listen("weight-close", move |_| {
        let mute_lock = run_clone.deref().lock();
        match mute_lock {
            Ok(mut v) => *v = false,
            Err(e) => println!("Failed to get mutex lock while cleaning up. {}", e),
        };
    });

    let mut previous_read = "".to_string();
    thread::spawn(move || loop {
        let mut serial_buf: Vec<u8> = vec![0; 32];
        let read_result = con.read(serial_buf.as_mut_slice());

        match read_result {
            Ok(_) => {
                let s = match str::from_utf8(&serial_buf) {
                    Ok(s) => s.trim_end_matches('\0').trim_end_matches('\n').to_string(),
                    Err(e) => {
                        println!("failed to convert to string: {}", e);
                        "".to_string()
                    }
                };
                if previous_read != s {
                    let _ = window.emit_all("weight-read", s.clone());
                    previous_read = s;
                }
            }
            Err(e) => {
                if e.kind() != ErrorKind::TimedOut {
                    println!("{}", e);
                }
            }
        }

        let mute_lock = run.deref().lock();
        match mute_lock {
            Ok(v) => {
                if !*v {
                    break;
                }
            }
            Err(e) => println!("Failed to get lock in emiting thread. : {}", e),
        };

        thread::sleep(Duration::from_millis(490));
    });

    Ok(())
}
