let real_delete = () => {
    if(confirm('정말 삭제하시겠습니까?')){
        document.querySelector('#delete_form').action = '/page/delete_process';
    }else{
        window.location('/');
    }
};

// action = "/page/delete_process"