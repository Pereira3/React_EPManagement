# How to setup
This project uses Next.js, how to deploy:
 
```bash
git clone https://github.com/Pereira3/React_EPManagement.git
npm install
npm run dev
```

If you want to skip husky's pre-commit linting and typecheck, when commiting write:
```bash
git commit -m "Message" --no-verify
```

Verify errors and Use Testing tools:
```bash
bash .hasky/pre-commit
npm run lint
npm run test #Run the simple test of Jest
npm run test:verbose #Jest test with details
npm run test:coverage #Jest test with coverage details
npm run cy:open #Will open Cypress integrated UI, select E2E Testing and run employee.cy.ts and projects.cy.ts
```

The CSS defined is following mockups that were given in intent to clone them.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# _Decisions Made and Personal Notes_
### _Technologies Used_
- **_[Husky and Lint](https://typicode.github.io/husky/get-started.html)_**
    They were the first dependencies I installed in the project in intend to validate my code and ensure that I didn't forget or neglect critical parts and errors in the project before commiting or developing.
- **_[Jest](https://jestjs.io/)_**\
    For unit and logical testing I'm using Jest, I wanted to test it out and I couldn't test components because I found it too much complex in that level so I only applied Jest testing in unit and logical parts.
- **_[Cypress](https://www.cypress.io/#create)_**\
    For application as an overall, e2e testing, I used Cypress. I saw that Cypress has component testing too but as I already had Jest testing individually the critical parts for the components and validating the possible inputs to the application, I used Cypress e2e testing and visualized better the user experience part with their integrated UI.
- **_[Zustand](https://zustand-demo.pmnd.rs/)_**\
    I was using react states to manage useStates for getters and setters but Zustand is much visually cleaner, easy and provides an overall better experience to the rest of the code itself.
### _Bugs that are Features_
- **_Situation marked in formsValidation.test.ts_**\
    Case: ' AL P h a' becomes 'AL P H A' so it will be different from 'Alpha' which is obviously wrong.
    Reason: I don't intend to solve the bug to preserve cases such as 'Davide Silva' and 'Davi de Silva', which are different but after normalization would be considered the same ('DAVIDESILVA').


# Learn More about Next.js
To learn more about Next.js, take a look at the following resources:
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.