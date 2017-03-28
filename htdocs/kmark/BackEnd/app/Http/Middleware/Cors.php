<?php

namespace App\Http\Middleware;

use Closure;
class Cors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        header('Access-Control-Allow-Headers: Content-Type,Accept');
        header('Access-Control-Allow-Credentials:true');
        header('Access-Control-Allow-Origin: http://localhost:8080' );
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, HEAD');

        return $next($request);


    }
}
