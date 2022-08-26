<?

function dummyFunction()
{
    $atLeastOneElementWasFound = true;

    while (!$atLeastOneElementWasFound) {

        $elementSatisfies = doSomething();
        if ($elementSatisfies) {
            $atLeastOneElementWasFound = true;
        }
    }
}