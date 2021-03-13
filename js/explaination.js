function endExplanation()
{
    var node = document.getElementById("explanation");
    while (node.firstChild) 
    {
        node.removeChild(node.firstChild);
    }
    node.remove();
    mainCal();
}