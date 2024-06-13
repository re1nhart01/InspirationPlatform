export interface ResponseD {
    statusCode: number;
    statusMessage: string;
    data?: any;
  }
  
  function GiveResponse(statusCode: number, statusMessage: string): ResponseD {
    return {
      statusCode,
      statusMessage,
    };
  }
  
  function GiveResponseWithData(statusCode: number, statusMessage: string, data: any): ResponseD {
    return {
      statusCode,
      statusMessage,
      data,
    };
  }
  
  function GiveOKResponseWithData(data: any): ResponseD {
    return {
      statusCode: 200,
      statusMessage: "Accepted",
      data,
    };
  }
  
  function GiveOKResponse(): ResponseD {
    return {
      statusCode: 200,
      statusMessage: "Accepted",
    };
  }

  export default { GiveOKResponse, GiveOKResponseWithData, GiveResponse, GiveResponseWithData }