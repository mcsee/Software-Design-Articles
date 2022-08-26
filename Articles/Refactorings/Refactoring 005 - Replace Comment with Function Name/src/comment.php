<?

function repl($str) {
  // Replaces with spaces the braces 
 
  $str = str_replace(array("\{","\}")," ",$str);
  return $str;

}