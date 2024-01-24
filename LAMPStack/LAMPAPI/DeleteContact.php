<?php
	$inData = getRequestInfo();
	
	$ID = $inData["ID"]; // This is the contact's ID number
	// $userId = $inData["userId"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		// $stmt = $conn->prepare("DELETE from Contacts where (ID, userID) == VALUES(?,?)");
		$stmt = $conn->prepare("DELETE from Contacts where ID = ?");
		$stmt->bind_param("s", $ID);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		// printf("Aff. Rows: %d\n", $conn->affected_rows);
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
