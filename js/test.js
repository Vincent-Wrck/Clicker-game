$(document).ready(function () {


    var game = {

        ressource: {

            iron: {

                total: 0,
                add: function () {

                    game.ressource.iron.total++

                },
                display: function () {

                    $(".iron").html(game.ressource.iron.total)

                },
                animation: function () {

                    $(".iron").addClass("minerIsActive");
                },
            },

        },

        manifacture: {

            ironPlate: {

                total: 0,
                add: function () {

                    if (game.ressource.iron.total >= 4) {

                        game.ressource.iron.total -= 4;
                        game.manifacture.ironPlate.total++;

                    };
                },
                display: function () {

                    $(".displayIronPlate").html(game.manifacture.ironPlate.total);

                },
            },

        },

        automated: {

            iron: {

                speed: 1,
                timer: 1000,
                isActive: 0,
                automation: function () {

                    if (game.manifacture.ironPlate.total >= 2) {

                        game.manifacture.ironPlate.total -= 2;
                        
                        setInterval(function () {

                            game.ressource.iron.total++
                            game.ressource.iron.display();

                        }, game.automated.iron.timer/game.automated.iron.speed );

                    };

                },
                

            },
        },

    };

    game.ressource.iron.display();
    game.manifacture.ironPlate.display();

    $(".rawIron").on("click", function () {

        game.ressource.iron.add();
        game.ressource.iron.display();

    });

    $(".ironPlate").on("click", function () {

        game.manifacture.ironPlate.add();
        game.manifacture.ironPlate.display();
        game.ressource.iron.display();

    });

    $(".auto").on("click", function () {

        game.automated.iron.automation();
        game.manifacture.ironPlate.display();


    })


})