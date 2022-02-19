class Game{
    constructor(){}
      
    start(){
        bg = createSprite(200,300,400,800);
        bg.addImage(backgroundIMG);
        bg.scale = 0.45;
        
        startButton = createSprite(200,200,50,10);
        startButton.addImage(startButtonIMG);
        startButton.scale = 0.3;

        title = createSprite(200,100,10,10);
        title.addImage(titleIMG);
        title.scale = 0.7;

        info = createSprite(81,572,10,10);
        info.addImage(infoIMG);
        info.scale = 0.08;        
    }

    setLevel1(){
        bg2 = createSprite(200,300,400,625);
        bg2.addImage(backgroundIMG2);
        bg2.scale = 0.9;
        bg2.visible = false;

        astroJet = createSprite(200,580,10,10);
        astroJet.addImage(astroJetIMG);
        astroJet.visible=false;
        astroJet.scale = 0.4;

    }

    playLevel1(){

        textSize(18);
        text("level 1",170,25); 
        textSize(15);   
        text("Target = 500",300,60);   
        
        bg2.visible = true;
        astroJet.visible = true;
        title.visible = false;

        //spawning aliens
        if (frameCount % 90=== 0) {
          var alien = createSprite(100,70,50,50);
          alien.x = Math.round(random(50,350));
          alien.addImage(alienIMG);
          alien.scale = 0.2;
          alien.velocityY = 10;
          alien.lifetime = 200;
          alienGroup.add(alien);
        }

        //spawning meteors
        if (frameCount % 80=== 0) {
          var meteor = createSprite(100,70,50,50);
          meteor.x = Math.round(random(50,350));
          meteor.addImage(meteorIMG);
          meteor.scale = 0.05;
          meteor.velocityY = 8;
          meteor.lifetime = 200;
          meteorGroup.add(meteor);
        }

        //shooting fireball when space is pressed
        if(keyWentDown("space")){
          var fireBall= createSprite(200,500,20, 20);
          fireBall.addImage(fireBallIMG);
          fireBall.x=astroJet.x;
          fireBall.velocityY = -8 ;
          fireBall.lifetime = 800;
          fireBall.scale = 0.1;
          fireBallGroup.add(fireBall);
          ShootSound.play();
        }

        //destroying aliens by fireball
        for(var fb = 0; fb < fireBallGroup.length; fb++){
          for(var al=0;al<alienGroup.length;al++){
            if(fireBallGroup.isTouching(alienGroup)){
              alienGroup.get(al).remove();
              fireBallGroup.get(fb).lifetime=0;
              score = score + 100;
            }
          }
        }
        
      //create boost
      if (frameCount % 200 === 0) {
        boost = createSprite(100,-50,50,50);
        boost.x = Math.round(random(50,350));
        boost.addImage(boostIMG);
        boost.scale = 0.05;
        boost.velocityY = 8;
        boost.lifetime = 200;
        boostGroup.add(boost);
      }

      //  if astrojet collects boost then lives increase
      for(var b=0;b<boostGroup.length;b++){
        if(boostGroup.isTouching(astroJet)){
          boostGroup.get(b).remove();
          lives = lives + 1;
          BoostSound.play();
        }
      }

      //lives reduces if meteor is touched
      for(var m=0;m<meteorGroup.length;m++){
        if(meteorGroup.isTouching(astroJet)){
          meteorGroup.get(m).remove();
          lives = lives - 1;
          DieSound.play();
        }
      }
  
      //move to level 2 if score is 1500
      if(score === 500){
        gameState = 2;
        BoostSound.play();

      }

    }

    playLevel2(){

      textSize(18);
      text("level 2",180,25); 
      textSize(15);   
      text("Target = 1000",260,60);  

      //spawning ufo with laser
        if (frameCount % 100=== 0) {
          var ufo = createSprite(100,70,50,50);
          ufo.x = Math.round(random(50,350));
          ufo.addImage(ufoIMG);
          ufo.scale = 0.35;
          ufo.velocityY = 9;
          ufo.lifetime = 800;
          ufoGroup.add(ufo);

          var laser1 = createSprite(100,70,50,50);
          laser1.x = ufo.x;
          laser1.addImage(laser1IMG);
          laser1.scale = 0.1;
          laser1.velocityY = 20;
          laser1.lifetime = 800;
          laser1Group.add(laser1);

       }

       //shooting missiles on space key
       if(keyDown("space")){
        var missile= createSprite(200,500,20, 20);
        missile.addImage(missileIMG);
        missile.x=astroJet.x;
        missile.velocityY = -8 ;
        missile.lifetime = 800;
        missile.scale = 0.3;
        missileGroup.add(missile);
        ShootSound.play();
      }

      //destroying ufo and laser
      if(missileGroup.isTouching(ufoGroup)){
        ufoGroup.destroyEach();
        missileGroup.destroyEach();
        laser1Group.destroyEach();
        score = score + 100;
      }

      //move to level 3 when score is 1000
      if(score === 1000){
        gameState = 3;
        BoostSound.play();
     }

    }

    playLevel3(){

      textSize(15);
      text("END LEVEL",180,25);   
      textSize(15);   
      text("Target = 20-Hits",260,60);
      textSize(13);
      text("BOSS-HEALTH :"+bossHealth,10,25);

      boss = createSprite(200,160,10,10);
      boss.addImage(bossIMG);
      boss.scale = 0.9;

      //blue laser
      if (frameCount % 30 === 0) {
        var laser3 = createSprite(100,150,50,50);
          laser3.x = Math.round(random(50,350));
          laser3.addImage(laserIMG);
          laser3.scale = 0.1;
          laser3.velocityY = 20;
          laser3.lifetime = 800;
          laser3Group.add(laser3)
      }

      //left red laser
        if (frameCount % 30 === 0) {
          var laser4 = createSprite(100,70,50,50);
            laser4.x = Math.round(random(10,50));
            laser4.addImage(laser1IMG);
            laser4.scale = 0.1;
            laser4.velocityY = 20;
            laser4.lifetime = 800;
            laser4Group.add(laser4)
        }

      //right red laser  
        if (frameCount % 30 === 0) {
          var laser5 = createSprite(100,70,50,50);
            laser5.x = Math.round(random(350,390));
            laser5.addImage(laser1IMG);
            laser5.scale = 0.1;
            laser5.velocityY = 20;
            laser5.lifetime = 800;
            laser5Group.add(laser5)
        }

        //shooting trident
        if(keyWentDown("space")){
          var trident= createSprite(200,500,20, 20);
          trident.addImage(tridentIMG);
          trident.x=astroJet.x;
          trident.velocityY = -10;
          trident.lifetime = 800;
          trident.scale = 0.4;
          tridentGroup.add(trident);
          ShootSound.play();
        }

        //boss health to reduce by 1
        for(var t=0; t<tridentGroup.length; t++){
          if(tridentGroup.isTouching(boss)){
            tridentGroup.get(t).remove();
            bossHealth = bossHealth - 1;
          }
        }

         if(laser3Group.isTouching(astroJet)||laser4Group.isTouching(astroJet)||laser5Group.isTouching(astroJet)){
          lives--;
          DieSound.play();
        }
        //when boss dies 
          if(bossHealth === 0){
            boss.visible=false;
            gameState=4;
            
          }
      }

  
  end(){
   
    earth = createSprite(200,300,400,625);
    earth.addImage(earthIMG);
    restart.visible = true ;
    restart.depth = earth.depth;
    restart.depth++;
    restart.y = 400;

    if(mousePressedOver(restart)){
      location.reload();
    }

    textSize(25)
    text("!Congratulations!",115,300);

    textSize(22)
    text("YOU WON!",150,350);
    WinSound.play();
    
  }

}

