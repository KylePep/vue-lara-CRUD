<?php

namespace App\Http\Controllers;

use App\Models\bucket;
use Illuminate\Http\Request;

class BucketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
        ]);

        $bucket = $request->user()->buckets()->create($request->only([
            'name',
            'description',
        ]));
        return $bucket;
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, bucket $bucket)
    {
        if ($bucket->user->id === $request->user()->id){
            return $bucket;
        }

        return response()->json(['message' => 'Cannot find this bucket.'], 404);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(bucket $bucket)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, bucket $bucket)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(bucket $bucket)
    {
        //
    }
}
