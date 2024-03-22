export default {
    openapi: "3.0.3",
    info: {
      title: "My Portifolio BackEnd",
      description: "My digital branding", 
      version: "1.0.0", 
      contact: {
        name: "Yvette IZANYIBUKA", 
        email: "izanyibukayvette@gail.com", 
        url: "web.com", 
      },
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "apiKey",
          scheme: "bearer",
          bearerFormat: "JWT",
          name: "Authorization",
          in: "header",
        },
      },
    },
  };