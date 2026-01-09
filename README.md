# How to setup
This project uses Next.js, how to deploy:
 
```bash
git clone https://github.com/Pereira3/React_EPManagement.git
npm install
npm run dev
```

If you want to run husky witouth having to commit into github, write:
```bash
bash .hasky/pre-commit
```
When a warning is flagged from lint with the bash line above and it states that is fixable, write:
```bash
npm run lint -- --fix
```
 
If you want to skip husky's pre-commit linting and typecheck, when commiting write:
```bash
git commit -m "Message" --no-verify
```

Jest is being used as Unit Testing Tool:
```bash
npm run test #Run the simple test of Jest
npm run test:verbose #Jest test with details
npm run test:coverage #Jest test with coverage details
```

The CSS defined is following mockups that were given in intent to clone them.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# _Decisions Made and Personal Notes_
### _Personal Preference Changes Made_
- **_Array.sort -> Array.toSorted_**\
    Reason: I didn't wanted to change the array itself so when I discovered toSorted() I wanted to change the implementation to avoid sorting my original array of data.
- **_CSS Specificity only for small resolutions_**\
    Reason: MUI materials already makes some changes to the UI itself so the content of the pages are already fitting well.\
    The only thing I found annyoing were the buttons, which were not leveled so I removed the span and only made icon visible, and the size of the nav bar, which was almost occupying one third of the screen unnecessarily.
### _Copilot Suggestions Implemented_
- **_WebContext -> DialogContext, ErrorContext and FormsContext_**\
    Reason: Reduce re-rendering work as I had multiple different useState hooks that were rendering without using the other hooks.\
    Example: I had WebContext with {action, assignment, errorMessage, formsValues, orderBy} and when I wanted to set the value for action or assisngment, I was re-rendering all the WebContext with all those parameters without really needing, costing a tiny bit of extra performance. 
- **_Helper Function for trimming and UpperCasing_**\
    Reason: Reduce repetition of .trim().toUpperCase() and syntax simplification.\
    All x.trim().toUpperCase() were changed to normalizedString(X) defined in utils.ts in shared folder
- **_Multiple Similar Cases of Sorting into only One_**\
    Reason: As name, team and role are all string and are treated the same way, one generic sort and Compare is enough, providing only the exception of dates. Transformed 50 lines of code into 20.
- **_Use of useMemo in the sortedLists (CHANGED)_**\
    Reason: Every render I was calling the list getter, including when pressing and selecting one employee/project, this way is only called when the list changes or when a new order is defined.
### _Copilot Suggestions Not Implemented_
- **_Use of React.memo on Projects, Employees and ProjectDetails_**\
    Reason: I did not implemented this because as React only re-renders something on change or when something is triggered, and the parent (page) doesn't have any change except the button to render the other components (Project or Employee), I couldn't see how React.memo would improve performance or optimize something.
### _Bugs that are Features_
- **_Situation marked in formsValidation.test.ts_**\
    Case: ' AL P h a' becomes 'AL P H A' so it will be different from 'Alpha' which is obviously wrong.
    Reason: I don't intend to solve the bug to preserve cases such as 'Davide Silva' and 'Davi de Silva', which are different but after normalization would be considered the same ('DAVIDESILVA').


# Learn More about Next.js
To learn more about Next.js, take a look at the following resources:
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.