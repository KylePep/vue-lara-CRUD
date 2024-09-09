<?php

use App\Http\Controllers\BucketController;
use App\Http\Controllers\BucketItemController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\LoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [LoginController::class, 'register']);
Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth:sanctum');

Route::get('/items', [ItemController::class, 'index']);
Route::post('/items', [ItemController::class, 'store']);
Route::put('/items/{item}', [ItemController::class, 'update']);
Route::delete('/items/{item}', [ItemController::class, 'destroy']);

// Route::get('/buckets', [BucketController::class, 'index']);
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/buckets', [BucketController::class, 'show']);
    Route::post('/buckets', [BucketController::class, 'store']); 
    Route::put('/buckets/{bucket}', [BucketController::class, 'update']); 
    Route::put('/buckets/{bucket}/check', [BucketController::class, 'check']); 
  
    Route::get('/buckets/{bucket}/items', [ItemController::class, 'show']);

    Route::post('/bucketitems', [BucketItemController::class, 'store']); 
    Route::put('/bucketitems/{bucketItem}/check', [BucketItemController::class, 'check']); 
    Route::delete('/bucketitems/{bucketItem}', [BucketItemController::class, 'destroy']); 
});