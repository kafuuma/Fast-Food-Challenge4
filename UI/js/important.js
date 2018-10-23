<table>
    <tr>
        <td data-to-json="id">1</td>
        <td data-to-json="text">Lorem ipsum dolor.</td>
        <td><button type="button">Click Me</button></td>
    </tr>
    <tr>
        <td data-to-json="id">2</td>
        <td data-to-json="text">Lorem ipsum dolor.</td>
        <td><button type="button">Click Me</button></td>
    </tr>
    <tr>
        <td data-to-json="id">3</td>
        <td data-to-json="text">Lorem ipsum dolor.</td>
        <td><button type="button">Click Me</button></td>
    </tr>
</table>



var table = document.querySelector("table")

table.addEventListener("click", function(e) {
    var element = e.target,
        parent

    //If the element is a button
    if ( element && element.nodeName == "BUTTON" ) {
        parent = element.parentNode

        //Find the closest parent that is a TR
        while ( parent.nodeName !== "TR" ) {
            parent = parent.parentNode
        }

        //Convert Row to JSON
        var data = {},
            child

        for ( var i = 0, _len = parent.children.length; i < _len; i++ ) {
            child = parent.children[i]

            if ( child.hasAttribute("data-to-json") ) data[child.getAttribute("data-to-json")] = child.innerText
        }

        // Do your AJAX stuff here
        console.log(json)
    }
})


