<?php 

if(empty($_GET['optimal'])) {
	echo "Expected token. <br> Token given null.";
	return;
}

$data = array();
switch ($_GET['halaman']) {
	case 'optimal':
		$data[] = "";

		break;
	
	default:
		# code...
		break;
}
?>