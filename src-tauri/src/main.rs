// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod weight_service;

use crate::weight_service::{emit_weight_on_port, get_ports};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![emit_weight_on_port, get_ports])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
