<?php
	$inData = getRequestInfo();
	
	// everything to be input
	// $userId = $inData["userId"];
	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$Login = $inData["Login"];
	$Password = $inData["Password"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		// changed lines here
		$stmt = $conn->prepare("INSERT into Users (firstName, lastName, Login, Password) 
			VALUES(?,?,?,?)");
		$stmt->bind_param("ssss", $firstName, $lastName, $Login, $Password);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		echo "New record created successfully\n";
		returnWithError("");
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
