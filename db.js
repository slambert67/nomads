    var db = (function () {
        var something = "cool";
        var another = [1, 2, 3];
        var fdb;

        /*var members = [
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
                                  currentRating: 2000,
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
            { id:   { memberNumber: 2,
                      forename: "Wayne",
                      middleName: null,
                      surname: "Cunningham",
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
                                  currentRating: 1800,
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
            { id:   { memberNumber: 3,
                      forename: "Andrew",
                      middleName: null,
                      surname: "Lark",
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
                                  currentRating: 1600,
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
            { id:   { memberNumber: 4,
                      forename: "Edwin",
                      middleName: null,
                      surname: "Mak",
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
                                  currentRating: 1400,
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
            { id:   { memberNumber: 5,
                      forename: "Chris",
                      middleName: null,
                      surname: "Graves",
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
                                  currentRating: 1200,
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
            { id:   { memberNumber: 6,
                      forename: "Alex",
                      middleName: null,
                      surname: "Smith",
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
                                  currentRating: 1000,
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
                        }}
        ];*/

        function init() {
            firebase.initializeApp({
                apiKey: 'AIzaSyDxgEiXAJEvXAA4CDsF1yXlQaIczU3skgo',
                authDomain: 'nomads-d85b5.firebaseapp.com',
                projectId: 'nomads-d85b5'});  

            fdb = firebase.firestore();

            fdb.settings({
                timestampsInSnapshots: true});
            
        }
        
        function getMembers() {

            return fdb.collection("members").get();

         }

         return {
	        getMembers: getMembers,
            init: init
         };
      
    })();
