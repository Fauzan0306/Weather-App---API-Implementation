import request

url = ""  # Ganti dengan URL API yang Anda miliki

try:
    # Membuat permintaan GET
    response = request.get(url)

    # Memeriksa kode status respons
    if response.status_code == 200:
        data = response.json()  # Mengonversi respons JSON menjadi objek Python
        # Lakukan sesuatu dengan data yang diterima
        print(data)
    else:
        print("Gagal mengambil data dari API")
except request.exceptions.RequestException as e:
    print("Terjadi kesalahan saat mengirim permintaan:", e)
