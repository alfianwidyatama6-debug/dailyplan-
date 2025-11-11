/**
 * Menangani semua interaksi dengan localStorage.
 */

const STORAGE_KEY = 'dailyplan_tasks';

/**
 * Menyimpan daftar tugas ke localStorage.
 * @param {Array} tasks - Array berisi objek tugas.
 */
function saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/**
 * Memuat daftar tugas dari localStorage.
 * @returns {Array} Array berisi objek tugas atau array kosong.
 */
function loadTasks() {
    const tasksJSON = localStorage.getItem(STORAGE_KEY);
    
    // Jika tidak ada data, kembalikan array kosong
    if (tasksJSON === null) {
        return [];
    }
    
    // Jika ada data, parse dan kembalikan
    try {
        return JSON.parse(tasksJSON);
    } catch (e) {
        console.error("Gagal memuat data tasks:", e);
        return [];
    }
}
