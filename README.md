Các chức năng của final project:
    + Login
    + Logout
    + User List 
    + Create new user
    + Update user
    + Delete user
    + Paging
    + Sorting
    + Filter

    User:
    + ID : string
    + First name : string
    + Last name : string
    + Address : string
    + Age : number
    + Department : string


    các action trong project:
    + login :
            - tạo user token lưu vào localstorage
            - login thành công thì chuyển về home page
            - form gồm có các fields : User Name, Password
    + logout : xóa user token, chuyển về page login


    + click button tạo mới user thì redirect về page create new chứa form nhập thông tin, validate form
    required tất cả các field, hiển thị message cho user biết, tạo thành công chuyển về home page
    + click button edit user thì redirect về edit page, edit thành công thì chuyển về home page
    + click button xóa user hiện popover confirm trước khi xóa


    note: modal ra giua 
    chinh cu li, khoang cach
    

    ẨN DELETE NẾU CÓ ROLE ADMIN
