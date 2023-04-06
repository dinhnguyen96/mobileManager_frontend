function getAllData()
{
    // goi ajax
    $.ajax({

        // Loại phương thức
        type: "GET",
        //tên API
        url: "http://localhost:8080/smartphones/list",
        //xử lý khi thành công
        // Hiển thị danh sách smartphone
        success: function (data){
            let content ="";
            if (data !== undefined)
            {
                for (let i = 0; i < data.length; i++)
                {
                    content += "<tr>"+getSmartphone(data[i])+"</tr>" ;
                }
            }
            document.getElementById('smartphoneList').innerHTML = content;
        }
    });
}
function getSmartphone(smartphone)
{
    return `<td>${smartphone.producer}</td><td >${smartphone.model}</td><td >${smartphone.price}</td>` +
        `<td><a class="deleteSmartphone" href="#" onclick="deleteSmartPhone(${smartphone.id})">Delete</a></td>`;
}

function addNewSmartPhone() {
    //lay du lieu
    let producer = $('#producer').val();
    let model = $('#model').val();
    let price = $('#price').val();
    let newSmartphone = {
        producer: producer,
        model: model,
        price: price
    };
    // goi ajax
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newSmartphone),
        //tên API
        url: "http://localhost:8080/smartphones/createSmartPhone",
        //xử lý khi thành công
        success: getAllData

    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
}

function deleteSmartPhone(data)
{
    // goi ajax
    $.ajax({
        type: "DELETE",
        //tên API
        url: `http://localhost:8080/smartphones/${data}`,
        //xử lý khi thành công
        success:getAllData

    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
}
