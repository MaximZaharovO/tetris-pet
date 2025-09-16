const cubeColor = "#f94144"
const stickColor = "#f3722c";
const pistol1Color = "#f8961e"
const roofColor = "#f9c74f"
const pistol2Color = "#90be6d"
const snake1Color = "#43aa8b"
const snake2Color = "#577590"

const cube = [
    /**
     * = =
     * = =
    */
    [
        {
            XOffset: 1,
            YOffset: 0,
            color: cubeColor
        },
        {
            XOffset: 2,
            YOffset: 0,
            color: cubeColor
        },
        {
            XOffset: 1,
            YOffset: 1,
            color: cubeColor
        },
        {
            XOffset: 2,
            YOffset: 1,
            color: cubeColor
        },
    ]
]

const stick = [
    /**
     * = = = =
    */
    [
        {
            XOffset: 0,
            YOffset: 0,
            color: stickColor
        },
        {
            XOffset: 1,
            YOffset: 0,
            color: stickColor
        },
        {
            XOffset: 2,
            YOffset: 0,
            color: stickColor
        },
        {
            XOffset: 3,
            YOffset: 0,
            color: stickColor
        },
    ],
    /**
     * =
     * =
     * =
     * =
    */
    [
        {
            XOffset: 3,
            YOffset: -2,
            color: stickColor
        },
        {
            XOffset: 3,
            YOffset: -1,
            color: stickColor
        },
        {
            XOffset: 3,
            YOffset: 0,
            color: stickColor
        },
        {
            XOffset: 3,
            YOffset: 1,
            color: stickColor
        },
    ],
    /**
     * = = = =
    */
    [
        {
            XOffset: 0,
            YOffset: 0,
            color: stickColor
        },
        {
            XOffset: 1,
            YOffset: 0,
            color: stickColor
        },
        {
            XOffset: 2,
            YOffset: 0,
            color: stickColor
        },
        {
            XOffset: 3,
            YOffset: 0,
            color: stickColor
        },
    ],
    /**
     * =
     * =
     * =
     * =
    */
    [
        {
            XOffset: 2,
            YOffset: -2,
            color: stickColor
        },
        {
            XOffset: 2,
            YOffset: -1,
            color: stickColor
        },
        {
            XOffset: 2,
            YOffset: 0,
            color: stickColor
        },
        {
            XOffset: 2,
            YOffset: 1,
            color: stickColor
        },
    ]
]

const pistol1 = [
    /**
     * = = =
     * =
    */
    [
        {
            XOffset: 0,
            YOffset: 0,
            color: pistol1Color
        },
        {
            XOffset: 1,
            YOffset: 0,
            color: pistol1Color
        },
        {
            XOffset: 2,
            YOffset: 0,
            color: pistol1Color
        },
        {
            XOffset: 0,
            YOffset: 1,
            color: pistol1Color
        }
    ],
    /**
     * = =
     *   =
     *   =
    */
    [
        {
            XOffset: 0,
            YOffset: -1,
            color: pistol1Color
        },
        {
            XOffset: 1,
            YOffset: -1,
            color: pistol1Color
        },
        {
            XOffset: 1,
            YOffset: 0,
            color: pistol1Color
        },
        {
            XOffset: 1,
            YOffset: 1,
            color: pistol1Color
        }
    ],
    /**
     *     =
     * = = =
    */
    [
        {
            XOffset: 2,
            YOffset: 0,
            color: pistol1Color
        },
        {
            XOffset: 0,
            YOffset: 1,
            color: pistol1Color
        },
        {
            XOffset: 1,
            YOffset: 1,
            color: pistol1Color
        },
        {
            XOffset: 2,
            YOffset: 1,
            color: pistol1Color
        }
    ],

    /**
     * =
     * =
     * = =
    */
    [
        {
            XOffset: 1,
            YOffset: -1,
            color: pistol1Color
        },
        {
            XOffset: 1,
            YOffset: 0,
            color: pistol1Color
        },
        {
            XOffset: 1,
            YOffset: 1,
            color: pistol1Color
        },
        {
            XOffset: 2,
            YOffset: 1,
            color: pistol1Color
        }
    ],
]

const pistol2 = [
    /**
     * = = =
     *     =
    */
    [
        {
            XOffset: 0,
            YOffset: 0,
            color: pistol2Color
        },
        {
            XOffset: 1,
            YOffset: 0,
            color: pistol2Color
        },
        {
            XOffset: 2,
            YOffset: 0,
            color: pistol2Color
        },
        {
            XOffset: 2,
            YOffset: 1,
            color: pistol2Color
        }
    ],
    /**
     *   =
     *   =
     * = =
    */
    [
        {
            XOffset: 1,
            YOffset: -1,
            color: pistol2Color
        },
        {
            XOffset: 1,
            YOffset: 0,
            color: pistol2Color
        },
        {
            XOffset: 1,
            YOffset: 1,
            color: pistol2Color
        },
        {
            XOffset: 0,
            YOffset: 1,
            color: pistol2Color
        }
    ],
    /**
     * =
     * = = =
    */
    [
        {
            XOffset: 0,
            YOffset: 0,
            color: pistol2Color
        },
        {
            XOffset: 0,
            YOffset: 1,
            color: pistol2Color
        },
        {
            XOffset: 1,
            YOffset: 1,
            color: pistol2Color
        },
        {
            XOffset: 2,
            YOffset: 1,
            color: pistol2Color
        }
    ],

    /**
     * = =
     * =
     * =
    */
    [
        {
            XOffset: 1,
            YOffset: -1,
            color: pistol2Color
        },
        {
            XOffset: 2,
            YOffset: -1,
            color: pistol2Color
        },
        {
            XOffset: 1,
            YOffset: 0,
            color: pistol2Color
        },
        {
            XOffset: 1,
            YOffset: 1,
            color: pistol2Color
        }
    ],
]

const roof = [
    /**
     * = = =
     *   =
    */
    [
        {
            XOffset: 0,
            YOffset: 0,
            color: roofColor
        },
        {
            XOffset: 1,
            YOffset: 0,
            color: roofColor
        },
        {
            XOffset: 2,
            YOffset: 0,
            color: roofColor
        },
        {
            XOffset: 1,
            YOffset: 1,
            color: roofColor
        }
    ],
    /**
     *   =
     * = =
     *   =
    */
    [
        {
            XOffset: 1,
            YOffset: -1,
            color: roofColor
        },
        {
            XOffset: 0,
            YOffset: 0,
            color: roofColor
        },
        {
            XOffset: 1,
            YOffset: 0,
            color: roofColor
        },
        {
            XOffset: 1,
            YOffset: 1,
            color: roofColor
        }
    ],
    /**
     *   =
     * = = =
    */
    [
        {
            XOffset: 1,
            YOffset: -1,
            color: roofColor
        },
        {
            XOffset: 0,
            YOffset: 0,
            color: roofColor
        },
        {
            XOffset: 1,
            YOffset: 0,
            color: roofColor
        },
        {
            XOffset: 2,
            YOffset: 0,
            color: roofColor
        }
    ],

    /**
     * =
     * = =
     * =
    */
    [
        {
            XOffset: 1,
            YOffset: -1,
            color: roofColor
        },
        {
            XOffset: 1,
            YOffset: 0,
            color: roofColor
        },
        {
            XOffset: 2,
            YOffset: 0,
            color: roofColor
        },
        {
            XOffset: 1,
            YOffset: 1,
            color: roofColor
        }
    ],
]

const snake1 = [
    /**
     *   = =
     * = =
    */
    [
        {
            XOffset: 1,
            YOffset: 0,
            color: snake1Color
        },
        {
            XOffset: 2,
            YOffset: 0,
            color: snake1Color
        },
        {
            XOffset: 0,
            YOffset: 1,
            color: snake1Color
        },
        {
            XOffset: 1,
            YOffset: 1,
            color: snake1Color
        }
    ],
    /**
     *   =
     *   = =
     *     =
    */
    [
        {
            XOffset: 1,
            YOffset: -1,
            color: snake1Color
        },
        {
            XOffset: 1,
            YOffset: 0,
            color: snake1Color
        },
        {
            XOffset: 2,
            YOffset: 0,
            color: snake1Color
        },
        {
            XOffset: 2,
            YOffset: 1,
            color: snake1Color
        }
    ],
    /**
     *   = =
     * = =
    */
    [
        {
            XOffset: 1,
            YOffset: 0,
            color: snake1Color
        },
        {
            XOffset: 2,
            YOffset: 0,
            color: snake1Color
        },
        {
            XOffset: 0,
            YOffset: 1,
            color: snake1Color
        },
        {
            XOffset: 1,
            YOffset: 1,
            color: snake1Color
        }
    ],

    /**
     * =
     * = =
     *   =
    */
    [
        {
            XOffset: 0,
            YOffset: -1,
            color: snake1Color
        },
        {
            XOffset: 0,
            YOffset: 0,
            color: snake1Color
        },
        {
            XOffset: 1,
            YOffset: 0,
            color: snake1Color
        },
        {
            XOffset: 1,
            YOffset: 1,
            color: snake1Color
        }
    ],
]

const snake2 = [
    /**
     * = =
     *   = =
    */
    [
        {
            XOffset: 0,
            YOffset: 0,
            color: snake2Color
        },
        {
            XOffset: 1,
            YOffset: 0,
            color: snake2Color
        },
        {
            XOffset: 1,
            YOffset: 1,
            color: snake2Color
        },
        {
            XOffset: 2,
            YOffset: 1,
            color: snake2Color
        }
    ],
    /**
     *     =
     *   = =
     *   =
    */
    [
        {
            XOffset: 2,
            YOffset: -1,
            color: snake2Color
        },
        {
            XOffset: 2,
            YOffset: 0,
            color: snake2Color
        },
        {
            XOffset: 1,
            YOffset: 0,
            color: snake2Color
        },
        {
            XOffset: 1,
            YOffset: 1,
            color: snake2Color
        }
    ],
    /**
     * = =
     *   = =
    */
    [
        {
            XOffset: 0,
            YOffset: 0,
            color: snake2Color
        },
        {
            XOffset: 1,
            YOffset: 0,
            color: snake2Color
        },
        {
            XOffset: 1,
            YOffset: 1,
            color: snake2Color
        },
        {
            XOffset: 2,
            YOffset: 1,
            color: snake2Color
        }
    ],
    /**
     *     =
     *   = =
     *   =
    */
    [
        {
            XOffset: 1,
            YOffset: -1,
            color: snake2Color
        },
        {
            XOffset: 1,
            YOffset: 0,
            color: snake2Color
        },
        {
            XOffset: 0,
            YOffset: 0,
            color: snake2Color
        },
        {
            XOffset: 0,
            YOffset: 1,
            color: snake2Color
        }
    ],
]

const FIGURES = [
    cube,
    stick,
    roof,
    pistol1,
    pistol2,
    snake1,
    snake2,
]

export default FIGURES