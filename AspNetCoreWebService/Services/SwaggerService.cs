using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetCoreWebService.Services
{
    public class SwaggerFilter : IDocumentFilter
    {
        public void Apply(OpenApiDocument swaggerDoc, DocumentFilterContext context)
        {
           /* //string file = AppDomain.CurrentDomain.BaseDirectory + "swagger.yaml";
            string file = "swagger.json";
            //var serializer = new YamlDotNet.Serialization.Serializer();
            var writer = new Microsoft.OpenApi.Writers.OpenApiJsonWriter(new TextWriter());
            {
                //serializer.Serialize(writer, swaggerDoc);
                var stream = new StreamWriter(file);
                //stream.WriteLine(writer.ToString());
                stream.WriteLine(swaggerDoc.SerializeAsV3(writer));
            }*/
        }
    }
}
