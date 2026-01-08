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

# _Decisions Made_
## _Personal Preference Changes Made_
- **_Array.sort -> Array.toSorted_**\
    Reason: I didn't wanted to change the array itself so when I discovered toSorted() I wanted to change the implementation to avoid sorting my original array of data.
## _Copilot Suggestions Implemented_
- **_WebContext -> DialogContext, ErrorContext and FormsContext_**\
    Reason: Reduce re-rendering work as I had multiple different useState hooks that were rendering without using the other hooks.\
    Example: I had WebContext with {action, assignment, errorMessage, formsValues, orderBy} and when I wanted to set the value for action or assisngment, I was re-rendering all the WebContext with all those parameters without really needing, costing a tiny bit of extra performance. 
- **_Helper Function for trimming and UpperCasing_**\
    Reason: Reduce repetition of .trim().toUpperCase() and syntax simplification.\
    All x.trim().toUpperCase() were changed to normalizedString(X) defined in utils.ts in shared folder
- **_Multiple Similar Cases of Sorting into only One_**\
    Reason: As name, team and role are all string and are treated the same way, one generic sort and Compare is enough, providing only the exception of dates. Transformed 50 lines of code into 20.
- **_Use of useMemo in the sortedLists_**\
    Reason: Every render I was calling the list getter, including when pressing and selecting one employee/project, this way is only called when the list changes or when a new order is defined.
## _Copilot Suggestions Not Implemented_
- **_Use of React.memo on Projects, Employees and ProjectDetails_**\
    Reason: I did not implemented this because as React only re-renders something on change or when something is triggered, and the parent (page) doesn't have any change except the button to render the other components (Project or Employee), I couldn't see how React.memo would improve performance or optimize something.

# Learn More about Next.js
To learn more about Next.js, take a look at the following resources:
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.