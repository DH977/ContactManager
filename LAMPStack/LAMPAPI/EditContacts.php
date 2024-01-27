<?php
	$inData = getRequestInfo();
	
	$id = $inData["ID"];
	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$Phone = $inData["Phone"];
	$Email = $inData["Email"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("UPDATE Contacts SET firstName=?, lastName=?, Phone=?, Email=? WHERE ID=?");
		$stmt->bind_param("sssss", $firstName, $lastName, $Phone, $Email, $id);
		$stmt->execute();
		$stmt->close();
		$conn->close();
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
