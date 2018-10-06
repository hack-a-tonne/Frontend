class restApi {

    constructor() {


    }

    call(url) {
        $.ajax({
            dataType: "json",
            url: url,
            data: data,
            success: success
        });
    }

}