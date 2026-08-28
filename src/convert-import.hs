-- Takes a ts or js file and adds .js to every import declaration if it wasn't already there.

import System.Environment

main = do
    (file : _) <- getArgs
    contents <- readFile file
    let fLines  = lines contents
        fLines' = addExtension <$> fLines
    -- Using seq to ensure the entire contents are read and the file closed.
    length contents `seq` (writeFile file $ unlines fLines')

addExtension xx
    | startsWith "import" xx = if lasts 3 pre /= ".js" then pre ++ ".js" ++ post else xx
    | otherwise              = xx
    where
    (pre, post) = splitAt (length xx - 2) xx -- for the quote and semicolon

lasts n xx = drop (length xx - n) xx
startsWith xx yy = take (length xx) yy == xx
