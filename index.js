let sniper = document.querySelector('.sniper')
let field = document.querySelector('.field')
let targetArea = document.querySelector('.target')
let spark = document.querySelector('.spark')
let startGame = document.querySelector('.startGame')
let gameOver = document.querySelector('.gameOver')
let hit = document.querySelector('.hit')
let ghostImg = document.querySelector('.ghostImg')
let headTarget = document.querySelector('.headTarget')
let bodyTarget = document.querySelector('.bodyTarget')
let headShotMsg = document.querySelector('.headShotMsg')
let life = document.querySelectorAll('.life')
let missShotMsg = document.querySelector('.missShotMsg')
let restartBtn = document.querySelector('.restartBtn')
let saw = new Wad({source : 'sound/SHOOT008.mp3'})
let saw2 = new Wad({source : 'sound/SHOOT010.mp3'})
let saw3 = new Wad({source : 'sound/SHOOT005.mp3'})
let playSound = new Wad({source : 'sound/playSound.mp3'})
let headShotSound = new Wad({source : 'sound/headshotSound.mp3'})
let gameOverSound = new Wad({source : 'sound/gameOver.mp3'})
let gameStartSound = new Wad({source : 'sound/gameLoadSound.mp3'})
let witchLaugh = new Wad({source : 'sound/witchEdit.mp3'})
let collectSound = new Wad({source : 'sound/coined.mp3'})
let finishSound = new Wad({source : 'sound/finishSound.mp3'})
let prevValueLeft = 47
let prevValueTop = 30
let headShotCount = 0
let highestScore = 704
let count = 0
let targetSpawn = 0
let game = true
let k = ''
let gameStart = false
let x = 0
let x2 = 0
let difficuty = document.querySelector('#difficulty')
let stayTime = difficuty.options[0].value

document.querySelector('.difficultyInfo').innerHTML = difficuty.children[0].innerHTML 
difficuty.addEventListener('change',function(e){
    stayTime = e.target.value
    document.querySelector('.difficultyInfo').innerHTML = difficuty.options[difficuty.selectedIndex].innerHTML
})

startGame.addEventListener('click',function(){
    document.querySelector('body').style.cursor = 'none'
    startGame.parentElement.style.display = 'none'
    document.querySelector('#difficulty').parentElement.parentElement.style.display = 'none'
    gameStartSound.stop()
    witchLaugh.play({
        volume  : 5,
        wait    : 0,
        loop    : false, 
        pitch   : 'E4',  
        label   : 'A',   
        env     : {hold : 9001},
        panning : [1, -1, 10],
        filter  : {frequency : 900},
        delay   : {delayTime : 1}
    })
        
    playSound.play({
        volume  : 0.6,
        wait    : 0,
        loop    : true, 
        pitch   : 'A4',  
        label   : 'A',   
        env     : {hold : 9001},
        panning : [1, -1, 10],
        filter  : {frequency : 900},
        delay   : {delayTime : 1}
    })

    window.addEventListener('mousedown',function(et){
        if(game){
            if(et.target != bodyTarget && et.target != headTarget){
                targetSpawn++
                life[targetSpawn-1].style.display = 'none'
                let x = et.clientX
                let y = et.clientY

                missShotMsg.style.opacity = '1'
                missShotMsg.style.top = y-15 + 'px' 
                missShotMsg.style.left = x+15 + 'px'
                setTimeout(()=>{
                    missShotMsg.style.opacity = '0'
                },400)
                witchLaugh.play({
                    volume  : 5,
                    wait    : 0,
                    loop    : false, 
                    pitch   : 'E4',  
                    label   : 'A',   
                    env     : {hold : 9001},
                    panning : [1, -1, 10],
                    filter  : {frequency : 900},
                    delay   : {delayTime : 1}
                })
                
                saw3.play({
                    volume  : 1.5,
                    wait    : 0,
                    loop    : false, 
                    pitch   : 'A4',  
                    label   : 'A',   
                    env     : {hold : 9001},
                    panning : [1, -1, 10],
                    filter  : {frequency : 900},
                    delay   : {delayTime : .8}
                })
            }

            if(targetSpawn == 3){
                game = false
                gameOver.style.display = 'block'
                sniper.style.display = 'none'
                sniper.style['pointer-events'] = 'auto';
                document.querySelector('body').style.cursor = 'default'
                document.querySelector('.scroreBoard').style.transition = 'all 500ms ease-in-out'
                setTimeout(()=>{
                    document.querySelector('.scroreBoard').style.left = '0%'
                    setTimeout(()=>{
                        collectSound.play({
                            volume  : 3,
                            wait    : 0,
                            loop    : true, 
                            pitch   : 'A4',  
                            label   : 'A',   
                            env     : {hold : 9001},
                            panning : [1, -1, 10],
                            filter  : {frequency : 900},
                            delay   : {delayTime : .8}
                        })

                        let scoreIntvl = setInterval(setint,20)
                        function setint(){
                            if(x<count){
                                x++
                            }
                    
                            document.querySelector('.yourScore').innerHTML = x
                            if(x == count){
                                clearInterval(scoreIntvl)
                                collectSound.stop()
                                finishSound.play({
                                    volume  : 3,
                                    wait    : 0,
                                    loop    : false, 
                                    pitch   : 'A4',  
                                    label   : 'A',   
                                    env     : {hold : 9001},
                                    panning : [1, -1, 10],
                                    filter  : {frequency : 900},
                                    delay   : {delayTime : .8}
                                })
                            }   
                        }

                        let scoreIntvlhig = setInterval(setinthig,100)

                        function setinthig(){
                            if(x2<headShotCount){
                                x2++
                            }
                            document.querySelector('.headShotCount').innerHTML = x2
                            if(x2 == headShotCount){
                                clearInterval(scoreIntvlhig)
                            }   
                        }
                    },700)
                   
                    document.querySelector('.highestScore').innerHTML = highestScore
                    if(document.querySelector('.yourScore').innerHTML > highestScore){
                        document.querySelector('.highestScore').innerHTML = document.querySelector('.yourScore').innerHTML
                    }
                },3000)
                setTimeout(()=>{
                    witchLaugh.stop()
                },2000)
                playSound.stop()
                gameOverSound.play({
                    volume  : 1.5,
                    wait    : 0,
                    loop    : false, 
                    pitch   : 'A4',  
                    label   : 'A',   
                    env     : {hold : 9001},
                    panning : [1, -1, 10],
                    filter  : {frequency : 900},
                    delay   : {delayTime : .8}
                })
            }
        }
    })

    document.querySelector('.restartBtn').addEventListener('click',function(){
            if(x == count){
            gameStart = false
            game = true
            k = ''
            prevValueLeft = 47
            prevValueTop = 30
            targetSpawn = 0
            headShotCount = 0
            count = 0
            x = 0
            x2 = 0
            gameOver.style.display = 'none'
            sniper.style.display = 'flex'
            sniper.style['pointer-events'] = 'none';
            document.querySelector('body').style.cursor = 'none'
            document.querySelector('.scroreBoard').style.left = '100%'
            document.querySelector('.scroreBoard').style.transition = 'none'
            document.querySelector('.score').innerHTML = 0
            document.querySelector('.yourScore').innerHTML = 0
            document.querySelector('.headShotCount').innerHTML = 0
            life.forEach(el => {
                el.style.display = 'block'
            });

            witchLaugh.play({
                volume  : 5,
                wait    : 0,
                loop    : false, 
                pitch   : 'E4',  
                label   : 'A',   
                env     : {hold : 9001},
                panning : [1, -1, 10],
                filter  : {frequency : 900},
                delay   : {delayTime : 1}
            })

            playSound.play({
                volume  : 0.6,
                wait    : 0,
                loop    : true, 
                pitch   : 'A4',  
                label   : 'A',   
                env     : {hold : 9001},
                panning : [1, -1, 10],
                filter  : {frequency : 900},
                delay   : {delayTime : 1}
            })
            gameOverSound.stop()
            finishSound.stop()
            }
    })

    let targetMove = ()=>{
        setInterval(targetGo,stayTime)
    }

    function targetGo(){
        if(game){
            let topValue = getRandomInt(targetArea.scrollHeight, field.scrollHeight)
            let leftValue = getRandomInt(targetArea.scrollWidth, field.scrollWidth)
            targetArea.style.top = topValue + 'px'
            targetArea.style.left = leftValue + 'px'
            console.log(targetArea.scrollWidth);
            if(leftValue - prevValueLeft < 0 && topValue - prevValueTop < 0){
                ghostImg.classList.add('targetRotateLeft')
                setTimeout(()=>{
                    ghostImg.classList.remove('targetRotateLeft')
                },600)
            }

            else if(leftValue - prevValueLeft < 0 && topValue - prevValueTop > 0){
                ghostImg.classList.add('targetRotateRight')
                setTimeout(()=>{
                    ghostImg.classList.remove('targetRotateRight')
                },600)
            }
            else if(leftValue - prevValueLeft > 0 && topValue - prevValueTop < 0){
                ghostImg.classList.add('targetRotateRight')
                setTimeout(()=>{
                    ghostImg.classList.remove('targetRotateRight')
                },600)
            }
            else if(leftValue - prevValueLeft > 0 && topValue - prevValueTop > 0){
                ghostImg.classList.add('targetRotateLeft')
                setTimeout(()=>{
                    ghostImg.classList.remove('targetRotateLeft')
                },600)
            }
                prevValueLeft = leftValue
                prevValueTop = topValue
        }
 }

    targetMove()
    targetGo()  
    window.addEventListener('mousemove',function(e){
    let x = e.clientX
    let y = e.clientY
    sniper.style.top = y + 'px' 
    sniper.style.left = x + 'px' 
    sniper.style.transform = 'translate(-50%,-50%) scale(1)'

 })

 window.addEventListener('mousedown',function(ev){
   if(k == 'a' && targetSpawn != 3){
        spark.style.display = 'block'
   }
   
    k = 'a'
    let x = ev.clientX
    let y = ev.clientY
    spark.style.top = y + 'px' 
    spark.style.left = x + 'px' 
    spark.style.transform = 'translate(-65%,-50%) scale(1)'
    setTimeout(()=>{
     spark.style.display = 'none'
    },100)
 })
 
 function getRandomInt(min, max) {
     min = Math.ceil(min);
     max = Math.floor(max);
     return Math.floor(Math.random() * (max - 2*min) + min);
   }

 targetArea.addEventListener('mousedown',function(e){
     if(game){
     if(e.target == bodyTarget || e.target == headTarget){
        witchLaugh.stop()
        saw.play({
            volume  : 1.5,
            wait    : 0,
            loop    : false, 
            pitch   : 'A4',  
            label   : 'A',   
            env     : {hold : 9001},
            panning : [1, -1, 10],
            filter  : {frequency : 900},
            delay   : {delayTime : .8}
        })

        count++

     if(e.target == headTarget){
        count = count + 4
        headShotSound.play({
            volume  : 2,
            wait    : 0,
            loop    : false, 
            pitch   : 'A4',  
            label   : 'A',   
            env     : {hold : 9001},
            panning : [1, -1, 10],
            filter  : {frequency : 900},
            delay   : {delayTime : .8}
        })
     }

     document.querySelector('.score').innerHTML =  count
         hit.classList.add('hitAnim')
         let x = e.clientX
         let y = e.clientY
         hit.style.top = y+'px' 
         hit.style.left = x+'px'
         hit.style.background = 'yellow'
         setTimeout(()=>{
          hit.classList.remove('hitAnim')
         },300)

         if(e.target == headTarget){
            headShotCount++
            headShotMsg.style.opacity = '1'
            headShotMsg.style.top = y-15 + 'px' 
            headShotMsg.style.left = x+15+'px'
            hit.style.background = 'yellow'
        }

        setTimeout(()=>{
            headShotMsg.style.opacity = '0'
        },500)
     }
     }
 })
})


