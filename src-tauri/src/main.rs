// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use core::str;
use std::{
    io::ErrorKind,
    ops::Deref,
    sync::{Arc, Mutex},
    thread,
    time::Duration,
};
use tauri::{Manager, Window};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn emit_weight_on_port(window: Window, port: &str, baud_rate: u32) -> Result<(), String> {
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
                let _ = window.emit_all("weight-read", s);
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

        thread::sleep(Duration::from_millis(300));
    });

    Ok(())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![emit_weight_on_port])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
