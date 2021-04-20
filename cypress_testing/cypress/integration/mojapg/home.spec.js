/// <reference types="cypress" />

logowanieTestowanie()


function logowanieTestowanie(){
    describe('mainPage',()=>{
        it('logowanie do moja.pg',()=>{
            //open moja.pg
            cy.visit('https://moja.test.pg.edu.pl/');
            //check url
            cy.url().should("include","moja")
            //check title
            cy.title().should("eq","Moja PG - Politechnika Gdańska")
    
            cy.get('a[href*="/auth"]').click()
        
            cy.get('input[name=username]').type('pszczola')
            cy.get('input[name=password]').type(`1qaz2wsx{enter}`)
    
            cy.get('input[type=submit]').click()
    
            cy.get('a[href*="/auth/app/system"]').click()

            testSzukania('Studenci','Nr albumu','11665544',1)
            testSzukania('','Nazwisko','Pszczoliński',1)
            testSzukania('','Imię','Pszczoliński',0)
            idzDoStrony('Dyplomy')
            testSzukania('','Nr albumu','11665544',4)
    
        })
    })
}

function idzDoStrony(strona){
    if(strona !== null && strona !== ''){
        cy.contains(strona).click({force: true})
        cy.wait(1000)
    }
}


function testSzukania(strona,filtr,wartosc,liczbaWynikow){
    if(strona !== null && strona !== ''){
        cy.contains(strona).click()
    }

    cy.contains(filtr).closest('div').find('input').type(wartosc)

    cy.contains('Szukaj').click()
    if(liczbaWynikow>0)
    {
        cy.contains('Wyników').closest('span').should('have.text', 'Wyników: '+liczbaWynikow+'.')
    }else
    {
        cy.contains('Brak wyników wyszukiwania').should('exist') 
    }

    cy.contains(filtr).closest('div').find('input').clear()

}