package com.workday.jersey;



import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

/**
 * Test response for confirming correct CORS configuration
 * 
 * @author Elisa Yan
 * @author Britney Wong
 * 
 * @since 7.1.2015
 */
@Path("testResponse")
public class testResponse {

	/**
	 * Acknowledge POST request
	 * @param id  not used
	 * @return response with test message string
	 */
	@POST
	@Produces(MediaType.TEXT_PLAIN)
	@Path("/POST")
	public Response testPOST(@PathParam("id") String id) {
		String serverReturnText = "test POST";
		ResponseBuilder response=Response.status(200).entity(serverReturnText);
		//Below three lines are necessary when you cross domain rest urls in the application. //For example,, if web app and rest server deployed in two different servers. For more
		
		//For more read about CORS HttpRequest
		response.header("Access-Control-Allow-Origin", "*");
		response.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS, X-XSRF-TOKEN");
		response.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding");
		
		//End of Header

		return response.build();
	
	}
	
	/**
	 * Acknowledge GET request
	 * @param id  not used
	 * @return response with test message string
	 */
	@GET
	@Produces(MediaType.TEXT_PLAIN)
	@Path("/GET")
	public Response testGet(@PathParam("id") String id) {
		String serverReturnText = "test GET";
		ResponseBuilder response=Response.status(200).entity(serverReturnText);
		//Below three lines are necessary when you cross domain rest urls in the application. //For example,, if web app and rest server deployed in two different servers. For more
		
		//For more read about CORS HttpRequest
		response.header("Access-Control-Allow-Origin", "*");
		response.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS, X-XSRF-TOKEN");
		response.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
		
		//End of Header
		
		return response.build();
	
	}

}


