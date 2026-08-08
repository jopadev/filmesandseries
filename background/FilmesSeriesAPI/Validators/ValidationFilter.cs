
using FluentValidation;

public class ValidationFilter<T> : IEndpointFilter where T : class
{
    private readonly IValidator<T> _validator;

    public ValidationFilter(IValidator<T> validator)
    {
        _validator = validator;
    }

    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
    {
        // Encontra o argumento do tipo CatalogoDto na requisição
        var argumentToValidate = context.Arguments.FirstOrDefault(x => x is T) as T;

        if (argumentToValidate is null)
        {
            return TypedResults.BadRequest("Dados de entrada inválidos.");
        }

        // Executa a validação (usando FluentValidation como exemplo)
        var validationResult = await _validator.ValidateAsync(argumentToValidate);

        if (!validationResult.IsValid)
        {
            // Converte os erros para o formato padrão do ASP.NET Core
            var errors = validationResult.ToDictionary();
            return TypedResults.ValidationProblem(errors);
        }

        return await next(context);
    }
}

