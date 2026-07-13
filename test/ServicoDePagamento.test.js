const assert = require('assert');
const ServicoDePagamento = require('../src/ServicoDePagamento');

describe('ServicoDePagamento', () => {
    let servico;

    beforeEach(() => {
        // Assegura uma instância limpa para cada teste
        servico = new ServicoDePagamento();
    });

    it('Deve categorizar como "cara" quando o valor for maior que 100.00', () => {
        servico.pagar('0987-7656-3475', 'Samar', 156.87);
        const ultimo = servico.consultarUltimoPagamento();

        assert.deepStrictEqual(ultimo, {
            codigoBarras: '0987-7656-3475',
            empresa: 'Samar',
            valor: 156.87,
            categoria: 'cara'
        });
    });

    it('Deve categorizar como "padrão" quando o valor for menor ou igual a 100.00', () => {
        servico.pagar('1111-2222-3333', 'Sabesp', 100.00);
        const ultimo = servico.consultarUltimoPagamento();

        assert.strictEqual(ultimo.categoria, 'padrão');
        assert.strictEqual(ultimo.valor, 100.00);
    });

    it('Deve consultar estritamente o último pagamento da lista', () => {
        servico.pagar('0000', 'Empresa A', 50.00);
        servico.pagar('1111', 'Empresa B', 250.00); // Este deve ser o último

        const ultimo = servico.consultarUltimoPagamento();

        assert.strictEqual(ultimo.empresa, 'Empresa B');
        assert.strictEqual(ultimo.valor, 250.00);
    });

    it('Deve retornar undefined caso a consulta seja feita sem pagamentos prévios', () => {
        const ultimo = servico.consultarUltimoPagamento();
        assert.strictEqual(ultimo, undefined);
    });
});
