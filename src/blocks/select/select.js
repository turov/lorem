export function useSelect () {
    let x, i, j, l, ll, selElmnt, a, b, c, list;
    /* Look for any elements with the class "custom-select": */
    x = document.getElementsByClassName("select");
    l = x.length;
    for (i = 0; i < l; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        console.log(selElmnt)
        ll = selElmnt.length;
        /* For each element, create a new DIV that will act as the selected item: */
        a = document.createElement("DIV");
        a.setAttribute("class", "select__selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        /* For each element, create a new DIV that will contain the option list: */
        b = document.createElement("DIV");
        b.setAttribute("class", "select__items-container select__items-container--hidden");
        list = document.createElement("UL")
        list.setAttribute("class", "select__items")
        for (j = 1; j < ll; j++) {
            /* For each option in the original select element,
            create a new DIV that will act as an option item: */
            c = document.createElement("LI");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.setAttribute("class", "select__item")
            c.addEventListener("click", function(e) {
                /* When an item is clicked, update the original select box,
                and the selected item: */
                let y, i, k, s, h, sl, yl;
                s = this.parentNode.parentNode.parentNode.getElementsByTagName("select")[0];
                sl = s.length;
                h = this.parentNode.parentNode.previousSibling;
                for (i = 0; i < sl; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        y = this.parentNode.parentNode.getElementsByClassName("select__item--selected");
                        yl = y.length;
                        for (k = 0; k < yl; k++) {
                            y[k].classList.remove("select__item--selected");
                        }
                        this.setAttribute("class", "select__item--selected select__item");
                        break;
                    }
                }
                h.click();
            });
            list.appendChild(c)
            b.appendChild(list);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function(e) {
            /* When the select box is clicked, close any other select boxes,
            and open/close the current select box: */
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select__items-container--hidden");
            this.classList.toggle("select__selected--active");
        });
    }

    function closeAllSelect(elmnt) {
        /* A function that will close all select boxes in the document,
        except the current select box: */
        var x, y, i, xl, yl, arrNo = [];
        x = document.getElementsByClassName("select__items-container");
        y = document.getElementsByClassName("select__selected");
        xl = x.length;
        yl = y.length;
        for (i = 0; i < yl; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i)
            } else {
                y[i].classList.remove("select__selected--active");
            }
        }
        for (i = 0; i < xl; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add("select__items-container--hidden");
            }
        }
    }

    /* If the user clicks anywhere outside the select box,
    then close all select boxes: */
    document.addEventListener("click", closeAllSelect);
}
