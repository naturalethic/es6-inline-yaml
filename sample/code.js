test('Should build basic javascript project async', async () => {
  const a = true
  const fixture = await Fixture.yaml(/* yaml */ `
    options:
      name: "javascript-basic-async"

    package.json:
      type: "module"
      main: "dist/index.js"
      foo: ${a ? '' : 'never'}

    index.js: |
      const done = new PromiseSubject()
      setTimeout(() => done.resolve(42), 0)
      export default done
      ${a ? '' : 'never'}
  `)

  const [entries] = await fixture.bundle('index.js')

  const control = await evalESM(fixture.path('index.js'))
  const result = await evalESM(entries.get('index.js'))

  assert.equal(await control.default, 42)
})

test('Should build basic javascript project async', async () => {
  const a = true
  const fixture = await Fixture.yaml`
    options:
      name: "javascript-basic-async"

    package.json:
      type: "module"
      main: "dist/index.js"
      foo: ${a ? '' : 'never'}

    index.js: |
      const done = new PromiseSubject()
      setTimeout(() => done.resolve(42), 0)
      export default done
      ${a ? '' : 'never'}
  `

  const [entries] = await fixture.bundle('index.js')

  const control = await evalESM(fixture.path('index.js'))
  const result = await evalESM(entries.get('index.js'))

  assert.equal(await control.default, 42)
})
