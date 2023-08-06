module.exports = {
    // 0 -> 사이트 주소, 1 -> 사진 주소, 2 -> 리스트, 3 -> 컨트롤러
    html: (link = '/', imgSrc = './images/img2.png', list, control) => {
        return `
            <!DOCTYPE html>
            <html lang = "ko">
                <head>
                    <meta charset = "utf-8">
                    <title>through the gate</title>
                    <link rel = "stylesheet" href = "../bin/style.css" type = "text/css" />
                </head>
                <body>
                    <div class = "bg_container">
                        <div class = "logo_container">
                            <a href = "/"><h3 class = "logo_txt"><span class = "gray">Through t</span>he Gate</h3></a>
                        </div>
                        <div class = "main_container">
                            <div class = "img_container">
                                <a href = "${link}"><img src = "${imgSrc}" class = "img"></a>
                            </div>
                            <div class = "list_container"> 
                                ${list}
                            </div>
                        </div>
                        <div class = "control_container">
                            ${control}
                        </div>
                    </div>
                    <footer>
                        <p>wndus123sh@naver.com</p>
                    </footer>
                    <script type = "text/javascript" src = "../bin/script.js"></script>
                </body>
            </html>
        `;
    },
    list: (fileList, spot) => {
        let list = '<div class = "sites">';
        let i = 0;
        while(i < fileList.length){
            if (fileList[i] === spot){
                list = list + `<p class = "txt_style" style = "font-weight: bold;">${fileList[i]}</p>`;
            }else{
                list = list + `<a href = "/page/${fileList[i]}" class = "txt_style">${fileList[i]}</a>`;
            }
            i++;
        }
        list = list+'</div>';
        return list;
    }
};