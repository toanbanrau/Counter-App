
# 🚀 Advanced Counter App – Yêu Cầu Nâng Cao

## 🎯 Mục tiêu
- Quản lý nhiều bộ đếm động
- Undo/Redo thao tác
- Hỗ trợ phím tắt tăng/giảm
- Animation số khi tăng/giảm
- Tối ưu hóa hiệu suất (memoization)

---

## 🧩 Yêu cầu chức năng

### 1. Multi-Counters
- Cho phép **tạo/xoá** bộ đếm mới
- Mỗi bộ đếm có nút: `+`, `–`, `reset`
- Giá trị của mỗi bộ đếm được lưu riêng

---

### 2. Undo / Redo
- Mỗi bộ đếm có lịch sử hành động
- Hành động bao gồm: `increment`, `decrement`, `reset`
- Lưu theo cấu trúc:
  ```ts
  { type: 'increment' | 'decrement' | 'reset', prev: number }
  ```
- Có nút `Undo`, `Redo` cho từng bộ đếm

---

### 3. Keyboard Shortcuts
- Nhấn `↑` để tăng, `↓` để giảm giá trị của bộ đếm đang được focus
- Click vào bộ đếm để chọn focus

---

### 4. Animation chuyển số
- Khi giá trị thay đổi, số **nhảy mượt**
- Có thể dùng `CSS transition` hoặc `framer-motion`

---

### 5. Memo hóa component
- Dùng `React.memo` để tránh re-render không cần thiết
- Dùng `useCallback` để tối ưu props truyền xuống
- Chỉ những bộ đếm bị thay đổi mới re-render

---

## 🧠 Bonus

| Tính năng                        | Kỹ thuật liên quan              |
|----------------------------------|----------------------------------|
| Export/import state              | JSON stringify & parse          |
| Lưu vào localStorage             | useEffect + localStorage        |
| Hiển thị số chênh lệch           | Track `prev` state              |
| Drag & drop sắp xếp bộ đếm       | react-beautiful-dnd hoặc tự làm |

---

## 📦 Gợi ý cấu trúc

```
CounterApp/
├── CounterApp.tsx        // Quản lý list bộ đếm
├── CounterCard.tsx       // 1 bộ đếm riêng lẻ
├── useCounter.ts         // Custom hook logic từng bộ đếm
├── useHistory.ts         // Hook undo/redo
```

---
