import { Link } from 'react-router-dom'

function ErrorPage () {
   return (
       <div className="error" >
        <h2>404 Error: Page Not Found</h2>
        <p>
            You know what the problem with the internet is? You think you know where
            you're going, but then you end up somewhere completely different!
        </p>
        <p>
            Like, you want to find a recipe for a cake, and then suddenly you're
            reading about conspiracy theories. That's just not right!
        </p>
        <p>
            And now, here you are, looking for a page that doesn't even exist!
            What's the deal with that? I mean, how hard is it to keep all the
            pages organized and in the right place?
        </p>
        <p>
            But I guess that's just the way it goes sometimes. You win some, you
            lose some, and sometimes you end up on a 404 error page.
        </p>
        <Link to="/">Back...</Link>
    </div>
   )
}


export default ErrorPage;