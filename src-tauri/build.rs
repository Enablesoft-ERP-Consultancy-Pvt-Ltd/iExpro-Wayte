use std::process::Command;

fn main() {
    // rerun build script everytime if new commit hash.
    println!("cargo:rerun-if-changed=../.git/HEAD");

    // set git info in cargo-env
    let output = Command::new("git")
        .args(&["rev-parse", "HEAD"])
        .output()
        .unwrap();
    let git_hash = String::from_utf8(output.stdout).unwrap();
    println!("cargo:rustc-env=GIT_HASH={}", git_hash);

    let output = Command::new("git")
        .args(&["rev-parse", "--abbrev-ref", "HEAD"])
        .output()
        .unwrap();
    let git_branch = String::from_utf8(output.stdout).unwrap();
    println!("cargo:rustc-env=GIT_BRANCH={}", git_branch);

    // tauri build.
    tauri_build::build()
}
