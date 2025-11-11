/**
 * Bertugas sebagai pengendali UI (DOM Controller).
 * Menghubungkan elemen HTML dengan logika di 'planner.js'.
 */

// Menunggu seluruh konten HTML selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    
    // Inisialisasi data
    initializePlanner();
    
    // Referensi ke elemen-elemen DOM
    const taskForm = document.getElementById('add-task-form');
    const taskInput = document.getElementById('new-task-input');
    const taskList = document.getElementById('task-list');
    const dateElement = document.getElementById('current-date');
    const summaryElement = document.getElementById('task-summary');

    // --- Fungsi Internal ---

    /**
     * Merender (menampilkan) semua tugas ke dalam list HTML.
     */
    function renderTasks() {
        // Kosongkan daftar sebelum mengisi ulang
        taskList.innerHTML = '';
        
        const tasks = getTasks();

        if (tasks.length === 0) {
            taskList.innerHTML = '<p class="text-gray-500 text-center">Belum ada tugas.</p>';
        } else {
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.className = 'flex items-center justify-between bg-gray-50 p-3 rounded-md shadow-sm task-item-enter';
                li.setAttribute('data-id', task.id);

                // Tambahkan kelas jika sudah selesai
                const textClass = task.completed ? 'line-through text-gray-400' : 'text-gray-800';

                li.innerHTML = `
                    <div class="flex items-center">
                        <input 
                            type="checkbox" 
                            class="task-toggle h-5 w-5 text-blue-600 rounded" 
                            ${task.completed ? 'checked' : ''}
                        >
                        <span class="ml-3 ${textClass}">${task.text}</span>
                    </div>
                    <button class="task-delete text-red-500 hover:text-red-700 font-bold">
                        &times;
                    </button>
                `;
                taskList.appendChild(li);
            });
        }
        
        // Perbarui ringkasan tugas
        updateSummary();
    }

    /**
     * Memperbarui teks ringkasan (jumlah tugas selesai).
     */
    function updateSummary() {
        const totalTasks = getTasks().length;
        const completedCount = countCompletedTasks();
        summaryElement.textContent = `✅ ${completedCount} dari ${totalTasks} tugas selesai`;
    }

    /**
     * Menampilkan tanggal hari ini.
     */
    function showDate() {
        const today = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = `Hari Ini: ${today.toLocaleDateString('id-ID', options)}`;
    }

    // --- Event Listeners ---

    /**
     * Menangani submit form untuk menambah tugas baru.
     */
    taskForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Mencegah reload halaman
        
        const taskText = taskInput.value;
        addTask(taskText); // Panggil logika dari planner.js
        
        renderTasks(); // Gambar ulang daftar tugas
        taskInput.value = ''; // Kosongkan input
    });

    /**
     * Menangani klik pada daftar tugas (untuk toggle atau hapus).
     * Ini menggunakan event delegation.
     */
    taskList.addEventListener('click', (event) => {
        const target = event.target;
        const taskElement = target.closest('li');
        if (!taskElement) return; // Klik di luar item list

        const taskId = Number(taskElement.getAttribute('data-id'));

        if (target.classList.contains('task-toggle')) {
            // Jika checkbox diklik
            toggleTask(taskId);
        } else if (target.classList.contains('task-delete')) {
            // Jika tombol hapus diklik
            deleteTask(taskId);
        }

        renderTasks(); // Gambar ulang daftar tugas
    });

    // --- Inisialisasi Saat Halaman Dimuat ---
    showDate();
    renderTasks();
});
