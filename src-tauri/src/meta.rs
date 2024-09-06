use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug)]
pub struct MetaInfo {
    git_hash: String,
    git_branch: String,
}

#[tauri::command]
pub fn get_meta_info() -> MetaInfo {
    MetaInfo {
        git_hash: env!("GIT_HASH").to_string(),
        git_branch: env!("GIT_BRANCH").to_string(),
    }
}
