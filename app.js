let count = 0;

const classPositionArray = ["position-bottom", "position-middle", "position-top"];

const shouldAPieceMove = ({ target }) => {
    const [ highlightedPiece ] = $('.highlight');

    if (!highlightedPiece) {
        return false;
    };

    const highlightedPieceWidth = $(highlightedPiece).width();
    const targetChildrenWidths = $(target).closest('.long-col').children('.js-piece').get().map(el => $(el).width());

    if (!targetChildrenWidths.length) {
        return true;
    }

    return targetChildrenWidths.every(el => {
          return el > highlightedPieceWidth
    });
};

const shouldIncrement = el => !el.is($(".highlight").closest(".long-col")) || !el.is($(".highlight").closest(".long-col").children());

const counterIncrease = () => {
    count++;
    $(".counter").html("Move Count: " + count);
};

const moveGamePieceOnDOM = (num, destination, classesToRemove, classPositionArray) => {
    $(".highlight").removeClass(classesToRemove)
                   .addClass(classPositionArray[num])
                   .detach()
                   .prependTo(destination);
};

const movePiece = ({ target }, move) => {
        const classesToRemove = classPositionArray.concat(["highlight"]).join(" ");
        const el = $(target)
        const numOfChildren = el.children().length;
        const numOfSiblings = el.closest(".long-col").children().length;

        if (move && el.hasClass("long-col")) {
            moveGamePieceOnDOM(numOfSiblings, el, classesToRemove, classPositionArray);

            if (shouldIncrement(el)) {
                counterIncrease();
            }
        }

        else if (move && el.hasClass("js-piece")) {
            moveGamePieceOnDOM(numOfChildren, el.closest(".long-col"), classesToRemove, classPositionArray);

            if (shouldIncrement(el)) {
                counterIncrease();
            }
        }

        else if (!move) {
           $(".highlight").toggleClass("highlight");
        };
};


const gameOver = () => {
    if ($(".col-3").children().length === 3) {
        $(".game-over").removeClass("hide");
        $(".long-col").addClass("hide");
    };
};


const startOver = () => {
    $(".game-over").addClass("hide");
    $(".long-col").removeClass("hide");
    $("div.js-piece").detach().prependTo(".col-1");
    $(".counter").html("Move Count: 0")
}

const startOverClickEvent = () => {
   $("button").on("click", event => {
       startOver();
   });
};

const clickOnPieceEvent = () => {
    $(".long-col").on("click", event => {
           if (!$(".highlight")[0]) {
              $(event.target).closest(".long-col")
                               .children()
                               .first()
                               .toggleClass("highlight");

              return;
           };

           const pieceShouldMove = shouldAPieceMove(event);

           movePiece(event, pieceShouldMove);
           gameOver();
    });
};


const initEvents = () => {
    clickOnPieceEvent();
    startOverClickEvent();
};

const init = () => {
    initEvents();
};

$(init);
