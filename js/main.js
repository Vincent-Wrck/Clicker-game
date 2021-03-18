$(document).ready(function () {
    //game rule 
    var game = {
        treshold: function () {
            if (game.pollution.current < 0) {
                game.pollution.current = 0;
            };
            if (game.income.current < 0) {
                game.income.current = 0
            };
        },
        gameOver: function () {
            if (game.income.current > 1000) {
                window.alert("winner");
                document.location.reload();
            };
            if (game.pollution.current > 1000) {
                window.alert("looser");
                document.location.reload();
            };
        },
        income: {
            current: 0,
            perClick: 1,
            pollution: 7,
            add: function () {
                game.income.current = game.income.current + game.income.perClick;
                game.pollution.current = game.pollution.current + game.income.pollution;
                game.gameOver();
            },
            display: function () {
                $(".incomeDisplay").html(game.income.current);
                $(".extractInfoValue").html(game.income.perClick);
                $(".extractInfoPollution, .addIncomePollutionToScore").html(game.income.pollution);
                $(".addMineralScore").html(game.income.perClick);
            },
            animation: function () {
                $(".addMineralToScore").addClass("addMineralToScoreAnim");
                setTimeout(function () {
                    $(".addMineralToScore").removeClass("addMineralToScoreAnim");
                }, 200);
            },
        },
        pollution: {
            current: 0,
            cost: 1,
            perClick: 5,
            reduce: function () {
                if (game.income.current >= game.pollution.cost) {
                    game.income.current = game.income.current - game.pollution.cost;
                    game.pollution.current = game.pollution.current - game.pollution.perClick;
                    game.treshold();
                    game.gameOver();
                };
            },
            display: function () {
                $(".pollutionDisplay").html(game.pollution.current);
                $(".pollutionInfoCost, .reducePollutionIncomeToScore").html(game.pollution.cost);
                $(".pollutionInfoValue, .reducePollutionToScore").html(game.pollution.perClick);
            },
            isEnough: function () {
                if (game.income.current <= game.pollution.cost) {
                    $(".reducePollution").addClass("notEnough")
                };
                if (game.income.current >= game.pollution.cost) {
                    $(".reducePollution").addClass("isEnough")
                };
            },
            animation: function () {
                $(".addPollutionToScore").addClass("addPollutionToScoreAnim");
                setTimeout(function () {
                    $(".addPollutionToScore").removeClass("addPollutionToScoreAnim");
                }, 200);
            },
        },
        upgrades: {
            income: {
                cost: 3,
                increaseCost: 2,
                perUpgrade: 1,
                pollutionPerUpgrade: 4,
                production: function () {
                    if (game.income.current >= game.upgrades.income.cost) {
                        game.income.current = game.income.current - game.upgrades.income.cost;
                        game.income.perClick = game.income.perClick + game.upgrades.income.perUpgrade;
                        game.income.pollution = game.income.pollution + game.upgrades.income.pollutionPerUpgrade;
                        game.upgrades.income.cost = game.upgrades.income.cost + game.upgrades.income.increaseCost;
                        game.treshold();

                    };
                },
                display: function () {
                    $(".valueUpgradeCost").html(game.upgrades.income.cost);
                    $(".valueUpgradeEffect").html(game.income.perClick + game.upgrades.income.perUpgrade);
                    $(".valueUpgradePollution").html(game.income.pollution);
                },
                isEnough: function () {
                    if (game.income.current < game.upgrades.income.cost) {
                        $(".mineralsValueUpgrade").css({
                            opacity: 0.6,
                            "text-decoration": "line-through",
                            cursor: "not-allowed",
                            transition: "ease-in-out 0.5s",
                        });
                    };
                    if (game.income.current >= game.upgrades.income.cost) {
                        $(".mineralsValueUpgrade").css({
                            opacity: 1,
                            "text-decoration": "none",
                            cursor: "pointer",
                            transition: "ease-in-out 0.5s",
                        });
                    };
                },
                animation: function () {
                    if (game.income.current >= game.upgrades.income.cost) {
                        $(".mineralValueCost").addClass("mineralValueCostAnim");
                        setTimeout(function () {
                            $(".mineralValueCost").removeClass("mineralValueCostAnim");
                        }, 200);
                    };

                },
            },
            pollution: {
                cost: 5,
                lessPolution: 2,
                production: function () {
                    if (game.income.current >= game.upgrades.pollution.cost) {
                        game.income.current = game.income.current - game.upgrades.pollution.cost;
                        game.pollution.perClick = game.pollution.perClick + game.upgrades.pollution.lessPolution;
                        game.upgrades.pollution.lessPolution++
                        game.upgrades.pollution.cost = game.upgrades.pollution.cost + 9
                        game.treshold();
                    };
                },
                display: function () {
                    $(".pollutionUpgradeCost").html(game.upgrades.pollution.cost);
                    $(".pollutionUpgradeEffect").html(game.upgrades.pollution.lessPolution);
                },
                isEnough: function () {
                    if (game.income.current < game.upgrades.pollution.cost) {
                        $(".greenTicketsValueUpgrade").css({
                            opacity: 0.6,
                            "text-decoration": "line-through",
                            cursor: "not-allowed",
                            transition: "ease-in-out 0.3s",
                        });
                    };
                    if (game.income.current >= game.upgrades.pollution.cost) {
                        $(".greenTicketsValueUpgrade").css({
                            opacity: 1,
                            "text-decoration": "none",
                            cursor: "pointer",
                            transition: "ease-in-out 0.3s",
                        });
                    };
                },
                animation: function () {
                    if (game.income.current >= game.upgrades.pollution.cost) {
                        $(".greenTicketsCost").addClass("greenTicketsCostAnim");
                        setTimeout(function () {
                            $(".greenTicketsCost").removeClass("greenTicketsCostAnim");
                        }, 200);
                    };

                },
            },
            automation: {
                factory: {
                    cost: 10,
                    income: 0,
                    pollution: 0,
                    costPerUpgrade: 40,
                    incomePerUpgrade: 3,
                    pollutionPerUpgrade: 6,
                    displayPollution: 0,
                    displayIncome: 0,
                    speed: 1000,
                    isActive: 0,
                    production: function () {
                        game.income.current = game.income.current - game.upgrades.automation.factory.cost;
                        game.upgrades.automation.factory.cost = game.upgrades.automation.factory.cost + game.upgrades.automation.factory.costPerUpgrade;
                        game.upgrades.automation.factory.income++;
                        game.upgrades.automation.factory.pollution++;
                    },
                    prodTime: function () {
                        game.income.current = game.income.current + (game.upgrades.automation.factory.income * game.upgrades.automation.factory.incomePerUpgrade);
                        game.pollution.current = game.pollution.current + (game.upgrades.automation.factory.pollution * game.upgrades.automation.factory.pollutionPerUpgrade);
                        game.gameOver();
                    },
                    display: function () {
                        $(".factoryCost").html(game.upgrades.automation.factory.cost);
                        $(".factoryIncome").html((game.upgrades.automation.factory.displayIncome = game.upgrades.automation.factory.displayIncome + game.upgrades.automation.factory.incomePerUpgrade));
                        $(".factoryPollution").html((game.upgrades.automation.factory.displayPollution = game.upgrades.automation.factory.displayPollution + game.upgrades.automation.factory.pollutionPerUpgrade));
                        $(".activeFactory").html(game.upgrades.automation.factory.isActive);
                    },
                    isEnough: function () {
                        if (game.income.current < game.upgrades.automation.factory.cost) {
                            $(".factoryValueUpgrade").css({
                                opacity: 0.8,
                                "text-decoration": "line-through",
                                cursor: "not-allowed",
                                transition: "ease-in-out 0.5s",
                            });
                        };
                        if (game.income.current >= game.upgrades.automation.factory.cost) {
                            $(".factoryValueUpgrade").css({
                                opacity: 1,
                                "text-decoration": "none",
                                cursor: "pointer",
                                transition: "ease-in-out 0.5s",
                            });
                        };
                    },
                    animation: function () {
                        if (game.income.current >= game.upgrades.automation.factory.cost) {
                            $(".factoryCostScore").addClass("factoryCostScoreAnim");
                            setTimeout(function () {
                                $(".factoryCostScore").removeClass("factoryCostScoreAnim");
                            }, 200);
                        };
                    },
                },
                greenPower: {
                    cost: 10,
                    income: 0,
                    pollution: 0,
                    costPerUpgrade: 80,
                    incomePerUpgrade: 1,
                    pollutionPerUpgrade: 2,
                    displayPollution: 0,
                    displayIncome: 0,
                    speed: 1000,
                    isActive: 0,
                    production: function () {
                        game.income.current = game.income.current - game.upgrades.automation.greenPower.cost
                        game.upgrades.automation.greenPower.cost = game.upgrades.automation.greenPower.cost + game.upgrades.automation.greenPower.costPerUpgrade;
                        game.upgrades.automation.greenPower.pollution++;
                        game.upgrades.automation.greenPower.income++;
                    },
                    prodTime: function () {
                        game.income.current = game.income.current - (game.upgrades.automation.greenPower.income * game.upgrades.automation.greenPower.incomePerUpgrade);
                        game.pollution.current = game.pollution.current - (game.upgrades.automation.greenPower.pollution * game.upgrades.automation.greenPower.pollutionPerUpgrade);
                        game.gameOver();
                    },
                    display: function () {
                        $(".greenPowerCost").html(game.upgrades.automation.greenPower.cost);
                        $(".greenPowerIncome").html(game.upgrades.automation.greenPower.displayIncome = game.upgrades.automation.greenPower.displayIncome + game.upgrades.automation.greenPower.incomePerUpgrade);
                        $(".greenPowerPollution").html(game.upgrades.automation.greenPower.displayPollution = game.upgrades.automation.greenPower.displayPollution + game.upgrades.automation.greenPower.pollutionPerUpgrade);
                        $(".activeGreenPower").html(game.upgrades.automation.greenPower.isActive);
                    },
                    isEnough: function () {
                        if (game.income.current < game.upgrades.automation.greenPower.cost) {
                            $(".greenEnergyValueUpgrade").css({
                                opacity: 0.8,
                                "text-decoration": "line-through",
                                cursor: "not-allowed",
                                transition: "ease-in-out 0.5s",
                            });
                        };
                        if (game.income.current >= game.upgrades.automation.greenPower.cost) {
                            $(".greenEnergyValueUpgrade").css({
                                opacity: 1,
                                "text-decoration": "none",
                                cursor: "pointer",
                                transition: "ease-in-out 0.5s",
                            });
                        };
                    },
                    animation: function () {
                        if (game.income.current >= game.upgrades.automation.greenPower.cost) {
                            $(".greenEnergyCost").addClass("greenEnergyCostAnim");
                            setTimeout(function () {
                                $(".greenEnergyCost").removeClass("greenEnergyCost");
                            }, 200);
                        };
                    },
                },
            },
        },
    };
    //Display Value
    var uiDisplay = function () {
        game.income.display();
        game.pollution.display();
        game.treshold();
    };
    var refreshUiValue = setInterval(uiDisplay, 200);
    //is Enough to build
    var isEnoughRessource = function () {
        game.pollution.isEnough();
        game.upgrades.pollution.isEnough();
        game.upgrades.income.isEnough();
        game.upgrades.automation.factory.isEnough();
        game.upgrades.automation.greenPower.isEnough();
    };
    var isEnoughToBeActive = setInterval(isEnoughRessource, 200)

    game.upgrades.income.display();
    game.upgrades.pollution.display();
    game.upgrades.automation.greenPower.display();
    game.upgrades.automation.factory.display();

    setInterval(game.upgrades.automation.factory.prodTime, 1000);
    setInterval(game.upgrades.automation.greenPower.prodTime, 1000);

       //User action
    $(".addIncome").on("click", function () {
        game.income.add();
        game.income.animation();
        game.income.display();
        game.pollution.display();
    });
    $(".lessPollution").on("click", function () {
        game.pollution.reduce();
        game.pollution.animation();
        game.income.display();
        game.pollution.display();

    });
    $(".mineralsValueUpgrade").on("click", function () {
        game.upgrades.income.production();
        game.upgrades.income.display();
        game.upgrades.income.animation();
    });
    $(".greenTicketsValueUpgrade").on("click", function () {
        game.upgrades.pollution.production();
        game.upgrades.pollution.display();
        game.upgrades.pollution.animation();
    });
    $(".factoryValueUpgrade").on("click", function () {
        if (game.income.current >= game.upgrades.automation.factory.cost) {
            game.upgrades.automation.factory.production();
            game.upgrades.automation.factory.animation();
            game.upgrades.automation.factory.display();
        };
    });
    $(".greenEnergyValueUpgrade").on("click", function () {
        if (game.income.current >= game.upgrades.automation.greenPower.cost) {
            game.upgrades.automation.greenPower.production();
            game.upgrades.automation.greenPower.animation();
            game.upgrades.automation.greenPower.display();
        };

    });
});
