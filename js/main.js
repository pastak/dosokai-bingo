$(function(){

    var bingoMax = 75; //75が最大値なビンゴが一番多いっぽい
    var drumLength = 0;
    var drumTypes = ['short.ogg','middle.ogg','long.ogg'];
    var initializedBingoList = function(){
        var arr = [];
        for(var i=1;i<=bingoMax;i++){arr.push(i)}
        return arr;
    };

    var bingoList = new function(){
        if(localStorage['bingoList'] == undefined){
            localStorage['bingoList'] = JSON.stringify(initializedBingoList());
        }
        return JSON.parse(localStorage['bingoList'])
    };
    console.log(bingoList);
    var audioElm = document.getElementById('drumroll');
    var bingoElm = $('#bingo');
    var row = $('<tr>');
    bingoElm.append(row);
    for(var i=1;i<=bingoMax;i++){
        if(bingoList.indexOf(i) === -1){
            row.append('<td id="number-'+i+'" class="selected">'+(('0'+i).slice(-2))+'</td>');
        }else{
            row.append('<td id="number-'+i+'" class="default">'+(('0'+i).slice(-2))+'</td>');
        }
        if(i%13 == 0){
            row = $('<tr>');
            bingoElm.append(row);
        }
    }
    audioElm.src = './sound/' + drumTypes[drumLength];
    audioElm.volume = 1.0;
    $('#bingoStartBtn').on('click',function(){
        $('#result').show();
        $('#bingoNum > span').text('...');
        $(this).prop('disabled',true);
        $('#rockzaemon').prop('src','./img/001.jpg');
        audioElm.currentTime = 0;
        audioElm.play();
        window.setTimeout(function(){
            var hitNum = Math.floor(Math.random()*bingoList.length);
            $('#bingoNum > span').text(bingoList[hitNum].toString().replace(/6/g,'六'));
            $('#number-' + bingoList[hitNum]).addClass('selected').removeClass('default');
            bingoList.splice(hitNum,1);
            localStorage['bingoList'] = JSON.stringify(bingoList);
            $('#rockzaemon').prop('src','./img/002.jpg');
            console.log(localStorage['bingoList']);
            $('#bingoStartBtn').prop('disabled',false);
        },2000);
    });
    $('#initializeBtn').on('click',function(){
        localStorage['bingoList'] = JSON.stringify(initializedBingoList());
        location.reload();
    });
    $('#closeBtn').on('click',function(){
        $('#result').hide();
    });
})
