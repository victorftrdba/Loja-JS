const spreadsheetid = '1hntUj1x8ZXC4A9JOhv1bGSf_Ot3oOvKlI_zyqwiDGXE'
fetch(`https://docs.google.com/spreadsheets/d/${spreadsheetid}/gviz/tq?tqx=out:json`)
    .then(res => res.text())
    .then(text => {
        const json = JSON.parse(text.substr(47).slice(0, -2))
        const linhas = json.table.rows
        const teste = (item) => {
            let nomeProduto = item.c[0].v
            let precoProduto = item.c[1].v
            let statusProduto = item.c[2].v
            let listarProdutos = document.querySelector('.produtos')
            statusProduto == 1 ? statusProduto = 'Ativo' : statusProduto = 'Inativo'

            listarProdutos.innerHTML += `
            <div id="item" class="shadow mb-4 w-25 text-center pt-3">
                <div><strong>Nome do Produto: </strong><span id="nome">${nomeProduto}</span></div>
                <div><strong>Preço do Produto: </strong>R$<span id="preco">${precoProduto}</span></div>
                <div><strong>Status do Produto: </strong>${statusProduto}</div>
                <div><button class="btn btn-primary mb-3 colocarCarrinho">Comprar</button></div>
            </div>
            `

            let add = document.querySelectorAll('.colocarCarrinho')

            for (let items of add) {
                let addItems = items.closest('#item')
                addItems.addEventListener('click', () => {
                    let nome = addItems.querySelector('#nome')
                    let preco = addItems.querySelector("#preco")
                    console.log(`
                    Você adicionou no carrinho
                    ${nome.textContent} com o 
                    preço de R$${preco.textContent}
                    `)
                })
            }

        }
        linhas.forEach(teste)
    })