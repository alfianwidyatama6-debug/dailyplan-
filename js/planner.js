/**
 * Berisi semua logika inti untuk mengelola state (data) tugas.
 * Berinteraksi dengan 'storage.js' tapi tidak dengan DOM ('app.js').
 */

// State utama aplikasi
let tasks = [];

/**
 * Inisialisasi planner dengan memuat tugas dari storage.
 */
function initializePlanner() {
    tasks = loadTasks();
}

/**
 * Mengembalikan daftar semua tugas saat ini.
 * @returns {Array} Array tugas.
 */
function getTasks() {
    return tasks;
}

/**
 * Menambah tugas baru ke dalam daftar.
 * @param {string} text - Deskripsi tugas baru.
 */
function addTask(text) {
    if (text.trim() === '') {
        alert("Tugas tidak boleh kosong!");
        return;
    }

    const newTask = {
        id: Date.now(), // ID unik menggunakan timestamp
        text: text,
        completed: false
    };

    tasks.unshift(newTask); // Tambah ke awal array
    saveTasks(tasks);
}

/**
 * Mengubah status 'completed' sebuah tugas.
 * @param {number} id - ID tugas yang akan diubah.
 */
function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    saveTasks(tasks);
}

/**
 * Menghapus tugas dari daftar.
 * @param {number} id - ID tugas yang akan dihapus.
 */
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks(tasks);
}

/**
 * Menghitung jumlah tugas yang sudah selesai.
 * @returns {number} Jumlah tugas selesai.
 */
function countCompletedTasks() {
    return tasks.filter(task => task.completed).length;
}
