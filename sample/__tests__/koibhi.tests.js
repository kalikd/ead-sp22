const sum = require('../index')
test('It adds two numbers together',()=>{
    expect(sum(2,3)).toBe(5)
})

test('Number to be defined',()=>{
    let a='6';
    let obj = {name:'Bilal', gender:'M'}
    let obj2 = {name:'Bilal', gender:'M'}
    expect(obj2).toBe(obj2)
})

test('Number to greater',()=>{
    let a=7-'A';
    expect(a).toBeNaN()
})

test('Array should contain', function(){
    let arr = [2,5,'KD','ABC,6']
    expect(arr).toContain('KD')
})