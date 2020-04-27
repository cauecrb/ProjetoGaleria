import $ from 'jquery'

// estas funcoes, sao para o ajax ler o luigins q cria os botoes

const loadHtmlSuccessCallbacks = []

export function onLoadHtmlSuccess(callback){
    if(!loadHtmlSuccessCallbacks.includes(callback)){
        loadHtmlSuccessCallbacks.push(callback)
    }
}

//função para incluir os botoes
function loadIncludes(parent){
    if(!parent) parent = 'body'
    $(parent).find('[wm-include]').each(function(i,e){
        const url = $(e).attr('wm-include')
        $.ajax({
            url,
            success(data){
                $(e).html(data)
                $(e).removeAttr('wm-include')

                loadHtmlSuccessCallbacks.forEach(callback => callback(data))
                loadIncludes(e)
            }
        })
    })
}

loadIncludes()