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
        $buckets = bucket::all();
        return response()->json($buckets);
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
    public function show(Request $request, Bucket $bucket)
    {
         // Retrieve all buckets associated with the authenticated user
    $buckets = Bucket::where('user_id', $request->user()->id)->get();

    return response()->json($buckets);
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
