<?php
// $data = array(
//   array("January", 10),
//   array("February", 20),
//   array("March", 15),
//   array("April", 25),
//   array("May", 30),
//   array("June", 18)
// );

//echo json_encode($data);



$servername= "localhost:4306";
$username="root";
$password="";
$dbname="base4";


$conn = mysqli_connect($servername,$username,$password,$dbname);

if (!$conn) {
       die("Connection failed: " . mysqli_connect_error());
   }

$query = "SELECT * FROM dummy_data";
   $data = mysqli_query($conn, $query);

   $total = mysqli_num_rows($data);

   //$result= mysqli_fetch_assoc($data);

   //echo $result['month']." ".$result['product']." ".$result['amount'];

   //echo "$total";

   // ...

if ($total != 0) {
  $arr = array();

  // Extract the unique months from the database results
  $months = array();
  while ($result = mysqli_fetch_assoc($data)) {
    $month = $result['month'];
    if (!in_array($month, $months)) {
      $months[] = $month;
    }
  }

  // Loop through each unique month and fetch the corresponding amount
  foreach ($months as $month) {
    mysqli_data_seek($data, 0);  // Reset the database cursor
    $amount = 0;
    while ($result = mysqli_fetch_assoc($data)) {
      if ($result['month'] === $month) {
        $amount = $result['amount'];
        break;
      }
    }
    $arr[] = array($month, $amount);
  }

  echo json_encode($arr);
} else {
  echo "no record";
}

// ...



// if ($conn){
//   echo "connection done";
// }
// else{
//   echo "connection failed".mysqli_connect_error();
// }


?>

