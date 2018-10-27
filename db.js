    var db = (function () {
        var something = "cool";
        var another = [1, 2, 3];

        var members = [
            { id:   { memberNumber: 1,
                      forename: "Steve",
                      middleName: null,
                      surname: "Lambert",
                      gender: "M"
                    },
              contact:  { address: { houseNumber: 37,
                                     street: "Royston Road",
                                     area: "Firswood",
                                     city: "Manchester",
                                     postcode: "M160EU"
                                    },
                          landline: null,
                          mobile: "07967977357",
                          email: "steve.lambert67@gmail.com"                
                        },
              ladder:   { med:  { participating: false,
                                  currentRating: 0,
                                  previousRating: 0,
                                  previousMatch:    { partner: 2,
                                                      opponent1: 3,
                                                      opponent2:4
                                                    }

                                },
                          mid:  { participating: false,
                                  currentRating: 0,
                                  previousRating: 0,
                                  previousMatch:    { partner: 2,
                                                      opponent1: 3,
                                                      opponent2: 4
                                                    }
                                },
                          mes:  { participating: false,
                                  currentRating: 0,
                                  previousRating: 0,
                                  previousMatch:    { opponent: 2 }                                              
                                }
                        }},
            {
                id: {
                    memberNumber: 2,
                    forename: "Steve",
                    middleName: null,
                    surname: "Lambert",
                    gender: "M"
                },
                contact: {
                    address: {
                        houseNumber: 37,
                        street: "Royston Road",
                        area: "Firswood",
                        city: "Manchester",
                        postcode: "M160EU"
                    },
                    landline: null,
                    mobile: "07967977357",
                    email: "steve.lambert67@gmail.com"
                },
                ladder: {
                    med: {
                        participating: false,
                        currentRating: 0,
                        previousRating: 0,
                        previousMatch: {
                            partner: 2,
                            opponent1: 3,
                            opponent2: 4
                        }

                    },
                    mid: {
                        participating: false,
                        currentRating: 0,
                        previousRating: 0,
                        previousMatch: {
                            partner: 2,
                            opponent1: 3,
                            opponent2: 4
                        }
                    },
                    mes: {
                        participating: false,
                        currentRating: 0,
                        previousRating: 0,
                        previousMatch: { opponent: 2 }
                    }
                }
            }

        ];

        function getMembers() {
	        return members;
         }

         return {
	        getMembers: getMembers
         };
      
    })();
