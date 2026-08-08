
using FluentValidation;

public class CreateCatalogoValidator : AbstractValidator<CreateCatalogoDto>
{
    public CreateCatalogoValidator()
    {
        RuleFor(x => x.Titulo)
            .NotEmpty().WithMessage("O título do catálogo é obrigatório.")
            .MaximumLength(255).WithMessage("O título não pode ter mais de 255 caracteres.");

        RuleFor(x => x.Tipo)
            .NotEmpty().WithMessage("O tipo (ex: Filme, Série) é obrigatório.")
            .Must(tipo => tipo == "Filme" || tipo == "Série")
            .WithMessage("O tipo deve ser obrigatoriamente 'Filme' ou 'Série'.");

        RuleFor(x => x.Genero)
            .NotEmpty().WithMessage("O gênero é obrigatório.");

        RuleFor(x => x.ImagemUrl)
            .NotEmpty().WithMessage("A URL da imagem é obrigatória.")
            .Must(LinkValido).WithMessage("A URL da imagem informada é inválida.");

        RuleFor(x => x.DataLancamento)
            .NotEmpty().WithMessage("A data de lançamento é obrigatória.")
            .LessThanOrEqualTo(DateTime.Now).WithMessage("A data de lançamento não pode ser uma data futura.");

        // Regra condicional: Se for opcional, mas enviado, valida o tamanho
        RuleFor(x => x.Duracao)
            .MaximumLength(30).WithMessage("A duração não pode ter mais de 30 caracteres.")
            .When(x => !string.IsNullOrEmpty(x.Duracao));

        // Observação: O campo 'JaAssistiu' é booleano (bool) e aceita nativamente true ou false,
        // por isso normalmente não exige uma regra de validação obrigatória.
    }

    // Função auxiliar para validar se o texto enviado possui o formato de um link HTTP/HTTPS
    private bool LinkValido(string url)
    {
        return Uri.TryCreate(url, UriKind.Absolute, out var uriResult)
               && (uriResult.Scheme == Uri.UriSchemeHttp || uriResult.Scheme == Uri.UriSchemeHttps);
    }
}

